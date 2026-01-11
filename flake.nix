{
  description = "A webapp to hook into the ldbgames API";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs_20
          git
        ];

        shellHook = ''
          echo "Frontend dev shell"
          echo "Run: npm run dev"
        '';
      };
    };
}