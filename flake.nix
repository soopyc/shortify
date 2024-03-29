{
	description = "Description for the project";

	inputs = {
		nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
		flake-parts.url = "github:hercules-ci/flake-parts";
	};

	outputs = inputs @ {flake-parts, ...}:
		flake-parts.lib.mkFlake {inherit inputs;} {
			imports = [
				# To import a flake module
				# 1. Add foo to inputs
				# 2. Add foo as a parameter to the outputs function
				# 3. Add here: foo.flakeModule
			];
			systems = ["x86_64-linux"]; # add more later
			perSystem = {
				config,
				self',
				inputs',
				pkgs,
				system,
				...
			}: {
				# Per-system attributes can be defined here. The self' and inputs'
				# module parameters provide easy access to attributes of the same
				# system.

				# Equivalent to inputs'.nixpkgs.legacyPackages.hello;
				packages.default = pkgs.hello;
				formatter = pkgs.alejandra;
			};
			flake = {
				# The usual flake attributes can be defined here, including system-
				# agnostic ones like nixosModule and system-enumerating ones, although
				# those are more easily expressed in perSystem.
			};
		};
}
