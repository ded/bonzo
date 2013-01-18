.PHONY: release

boosh:
	node_modules/smoosh/bin/smoosh make make/build.js

# for repo owners only
release:
	node make/release.js