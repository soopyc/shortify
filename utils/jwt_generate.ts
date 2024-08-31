#!/usr/bin/env -S deno run
/**
 * so much so for a clean implementation..,,.,.
 * at least it's portable to some extent /shrug
 */
import {
	parse,
	ParseOptions,
} from "https://deno.land/std@0.205.0/flags/mod.ts";
import * as colors from "https://deno.land/std@0.205.0/fmt/colors.ts";
import * as jose from "https://deno.land/x/jose@v5.1.0/index.ts";

const encoder = new TextEncoder();
const help = `JWT_GENERATE.TS(1)                                        LINKIFY(1)

NAME
    ${colors.blue(
		"deno jwt_generate.ts",
	)} <-t type> <-f format> [-hsSol] [options...]

SYNOPSIS
    your mother, aka a simple jwt secure token generator.
    deno is required.

OPTIONS
           -h, --help: show this manual
      -s, --symmetric: generate a symmetric secret (default)
     -S, --asymmetric: generate an asymmetric key pair

         -o --outfile: the file to output to defaults to
                       "jwt_\${KEYTYPE}.key". pass "-" to shove the
                       key to stderr instead.

           -t, --type: **${colors.brightYellow("this is case sensitive")}**
                       the key type to generate. check JWT docs for
                       all available types.

  -f, --export-format: export format to use (one of [jwk, pkcs])
                       note: for symmetric keys, only jwk can be
                       used.

KEY GENERATION OPTIONS
       --curve, --crv: [ec] the curve type to use.
         -l, --modlen: [rsa] modulus length for the rsa key

                                                          LINKIFY(1)`;

enum ExportFormat {
	JWK = "jwk",
	PKCS = "pkcs",
}

const cliArgs: ParseOptions = {
	boolean: ["help", "symmetric", "asymmetric"],
	string: ["export-format", "outfile", "modlen", "curve"],

	default: {
		"modlen": undefined,
		"outfile": null,
		"curve": undefined,
		"export-format": ExportFormat.JWK,
	},

	alias: {
		"help": "h",
		"modlen": "l",
		"type": "t",
		"export-format": "f",
		"symmetric": "s",
		"asymmetric": "S",
		"outfile": "o",
		"curve": "crv",
	},
};

/**
 * check the validity of provided cli arguments and set defaults when needed.
 * @returns validated arguments
 */
function validateArgs() {
	const args = parse(Deno.args, cliArgs);

	// bypass checks if we're only doing --help.
	if (args.help) return args;

	// we are only able to select one from symmetric or asym. key types
	if (args.symmetric && args.asymmetric) {
		throw new Error(
			"symmetric and asymmetric keys are mutually exclusive. please only select one.",
		);
	}
	if (!args.type) throw new Error("please specify a key type with --type.");
	if (!Object.values(ExportFormat).includes(args["export-format"])) {
		throw new Error(
			`export type ${
				args.format
			} is not in the recognized format list (${Object.values(ExportFormat)})`,
		);
	}

	// set defaults
	if (!(args.symmetric || args.asymmetric)) args.symmetric = true;
	if (args.modlen) args.modlen = Number(args.modlen); // coerce modlen into a number

	const outfileSuffix
		= args["export-format"] == ExportFormat.JWK ? "jwk.json" : "pem";
	if (args.outfile == null) args.outfile = `jwt_${args.type}.${outfileSuffix}`; // set default only if
	return args;
}

/**
 * Intelligently determine the format to use when exporting a key, and encodes the text afterwards.
 * @param key resulting key object to export.
 * @param exportFormat resulting export type, one of JWK or PKCS.
 */
async function exportKey(
	key: jose.KeyLike,
	exportFormat: ExportFormat,
): Promise<Uint8Array> {
	let final: string;
	if (exportFormat == ExportFormat.JWK) {
		// JWK handling is simple as it supports everything. just barf out the key.
		final = JSON.stringify(await jose.exportJWK(key));
	} else if (exportFormat == ExportFormat.PKCS) {
		// first switch case in this file, are you proud??!??!
		switch (key.type) {
			case "public":
				final = await jose.exportSPKI(key);
				break;
			case "private":
				final = await jose.exportPKCS8(key);
				break;
			case "secret":
				throw new Error(
					"non asymmetric keys must not use SPKI/PKCS8 output format.",
				);
			default:
				throw new Error(
					`unknown key type ${key.type}. this is a bug. please report this error.`,
				);
		}
	} else {
		throw new Error(
			`unsupported export type ${exportFormat}. this is a bug. please report this error.`,
		);
	}
	return encoder.encode(final);
}

async function generateDots() {
	const spinner = "-\\|/";
	let i = 0;
	await Deno.stdout.write(encoder.encode("/"));
	const interval = setInterval(async () => {
		await Deno.stdout.write(encoder.encode("\b" + spinner[i]));
		if (i < spinner.length - 1) {
			i++;
		} else {
			i = 0;
		}
	}, 25);

	return (failed = false) => {
		clearInterval(interval);
		if (!failed) console.log("\bdone!");
	};
}

async function main() {
	const args = validateArgs();

	if (args.help) {
		console.log(help);
		return;
	}

	let finalKey;
	let stopLoader: Awaited<ReturnType<typeof generateDots>> = (_) => { _; };
	try {
		if (args.symmetric) {
			await Deno.stdout.write(
				encoder.encode(colors.blue("generating secret ")),
			);
			stopLoader = await generateDots();
			const secret = await jose.generateSecret(args.type, {
				extractable: true,
			});
			stopLoader();
			finalKey = secret;
			// we're done here
		} else if (args.asymmetric) {
			await Deno.stdout.write(
				encoder.encode(colors.blue("generating secret ")),
			);
			stopLoader = await generateDots();

			const { publicKey, privateKey } = await jose.generateKeyPair(args.type, {
				extractable: true,
				modulusLength: args.modlen,
				crv: args.curve,
			});
			stopLoader();
			console.log(colors.green("resulting public key"));
			await Deno.stderr.write(
				await exportKey(publicKey, args["export-format"]),
			);
			console.log();
			finalKey = privateKey;
			// we're finally done here
		} else {
			throw new Error("this is not supposed to happen!!??!?!?");
		}
	} catch (e) {
		stopLoader(true);
		if (e instanceof jose.errors.JOSENotSupported) {
			console.error(
				colors.red(
					"an error occurred. this is most likely due to your key not being a compatible type.",
				),
			);
			console.error(
				colors.red(
					`please check if your key type (${args.type}) is actually a ${
						args.symmetric ? "symmetric" : "asymmetric"
					} key type.`,
				),
			);
		}
		throw e;
	}

	const output
		= finalKey instanceof Uint8Array
			? finalKey
			: await exportKey(finalKey, args["export-format"]);
	if (args.outfile == "-") {
		console.log(colors.brightYellow("WARNING: writing private key to stderr"));
		await Deno.stderr.write(output);
		console.log();
	} else {
		console.log(`writing to file ${args.outfile}...`);
		Deno.writeFile(args.outfile, output, { createNew: true })
			.then(() => console.log(`wrote to file successfully.`))
			.catch(async (r) => {
				if (r instanceof Deno.errors.AlreadyExists) {
					console.log(colors.red("file already exists!"));
					await Deno.stdout.write(encoder.encode("overwrite? [y/N] "));
					const wtf = new Uint8Array(new ArrayBuffer(1));
					Deno.stdin.setRaw(true);
					await Deno.stdin.read(wtf);
					Deno.stdin.setRaw(false);
					const decision = new TextDecoder().decode(wtf).toLowerCase();
					console.log(colors.brightBlack(decision));
					if (decision == "y") {
						console.log(
							colors.yellow("\nwarning: overwrote file with new contents."),
						);
						Deno.writeFile(args.outfile, output);
					} else {
						console.log(colors.red("not overwriting file, discarding key"));
					}
				} else {
					throw r;
				}
			});
	}
}

await main();
