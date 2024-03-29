import { visit } from "unist-util-visit";

function removeCodeTrail() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (tree: any) => {
		// remove trailing newline from code
		visit(tree, "element", (node) => {
			if (node.tagName === "code") {
				for (const child of node.children) {
					if (child.type === "text") {
						child.value = child.value.replace(/\n$/, "");
					}
				}
			}
		});
	};
}

export { removeCodeTrail}