import fse from "fs-extra";

export function copyPublicFiles() {
    fse.copySync("./src/doc", "./dist/doc", { recursively: true });
}
