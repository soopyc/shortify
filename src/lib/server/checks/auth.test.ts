import { importJWK } from "jose";
import { expect, test } from "vitest";
import { checkJWT } from "./auth";

const dummyKey = await importJWK({ kty: "oct", k: "EiSRB7OnnYXnk3gZlJt9dfPU85ov9WALG5FgoqwVyX4" });
const edKey = await importJWK({ kty: "OKP", crv: "Ed25519", x: "wkJqqpdhV_Plfgmc11effrUuI0Gy5kQM04J2F9_tZbs", d: "4RbC4cKwPK70sh3I4LXRK3jRaWckDzR-YoEeX98cZNQ" });

test("key signed by dummy key should verify", async () => {
	await expect(checkJWT(
		"eyJhbGciOiJIUzI1NiJ9.eyJwYXRjaCI6dHJ1ZSwiZGVsZXRlIjp0cnVlLCJzdWIiOiJRVWJuIiwiaXNzIjoiU2hvcnRpZnkgdjAuMC40LWFscGhhLjAifQ.do-BfClKsQzta6SAXgCSWq4qHyijzpyoby1VdwwhSNg",
		"QUbn",
		"HS256",
		dummyKey,
	)).resolves.toBeTruthy();
});

test("key signed by asymmetric keys should verify", async () => {
	await expect(checkJWT(
		"eyJhbGciOiJFZERTQSJ9.eyJwYXRjaCI6dHJ1ZSwiZGVsZXRlIjp0cnVlLCJzdWIiOiJxS1k3IiwiaXNzIjoiU2hvcnRpZnkgdjAuMC40LWFscGhhLjAifQ.lKMOErI8tKkj6yP4WyMdmTue22LlsVRhiYuGfbjEbyWF5CKkEKMtBvTt1YKV8TKZSVx-pNgLM3C3fE6lbpv5Bg",
		"qKY7",
		"EdDSA",
		edKey,
	)).resolves.toBeTruthy();
});

test("keys with none algo must error", async () => {
	await expect(checkJWT(
		"eyJhbGciOiJub25lIn0.eyJwYXRjaCI6dHJ1ZSwic3ViIjoiZ29jayJ9.",
		"gock",
		"none",
		edKey,
	)).rejects.toThrowError("alg none is not supported");
});

test("key to the wrong subject should error", async () => {
	await expect(checkJWT(
		"eyJhbGciOiJIUzI1NiJ9.eyJwYXRjaCI6dHJ1ZSwiZGVsZXRlIjp0cnVlLCJzdWIiOiJRVWJuIiwiaXNzIjoiU2hvcnRpZnkgdjAuMC40LWFscGhhLjAifQ.do-BfClKsQzta6SAXgCSWq4qHyijzpyoby1VdwwhSNg",
		"gock",
		"HS256",
		dummyKey,
	)).rejects.toThrowError("unexpected \"sub\" claim");
});

test("key signed by the wrong key should error", async () => {
	await expect(checkJWT(
		"eyJhbGciOiJIUzI1NiJ9.eyJwYXRjaCI6dHJ1ZSwiZGVsZXRlIjp0cnVlLCJzdWIiOiJ5TkhwIiwiaXNzIjoiU2hvcnRpZnkgdjAuMC40LWFscGhhLjAifQ.bu8Ima1RQm5a0avHEM1jb03P5ueP6S9C5DZ85kt4nwk",
		"yNHp",
		"HS256",
		dummyKey,
	)).rejects.toThrowError("signature verification failed");
});

test("key with the wrong alg should error", async () => {
	await expect(checkJWT(
		"eyJhbGciOiJFZERTQSJ9.eyJwYXRjaCI6dHJ1ZSwiZGVsZXRlIjp0cnVlLCJzdWIiOiJDV09NIiwiaXNzIjoiU2hvcnRpZnkgdjAuMC40LWFscGhhLjAifQ.ECK6adv1Zem5JTMVEpMULiNuxN3MxOvSdgvtIzI4leYHs8KyXHB96f2AGvXNl7W79FTnKBTwOET1kqiy-ANHCQ",
		"rs7s",
		"HS256",
		dummyKey,
	)).rejects.toThrowError(/^"alg" .* value not allowed/);
});
