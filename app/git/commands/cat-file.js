const path = require("path");
const fs = require("fs");

const zlib = require("zlib");
class CatFileCommand {
    constructor(flag, commitSHA) {
        // Initialization code here
        this.flag = flag;
        this.commitSHA = commitSHA;
    }


    execute() {
        console.log("Executing cat-file command");
        // STEPS TO IMPLEMENT:
        // Navigate to ./git/objects/commitSHS[0..2]
        // read the file named commitSHA[2..end]
        // decompress the file content
        // output the content based on the flag=

        const flags = this.flag;
        const commitSHA = this.commitSHA;
        switch (flags) {
            case "-p":
                {
                    const folder = commitSHA.slice(0, 2);
                    const file = commitSHA.slice(2);

                    const completePath = path.join(process.cwd(), ".git", "objects", folder, file);

                    if (!fs.existsSync(completePath)) {
                        throw new Error(`Object ${commitSHA} does not exist`);
                    }

                    const fileContent = fs.readFileSync(completePath);

                    const outputBuffer = zlib.inflateSync(fileContent);
                    const output = outputBuffer.toString();

                    process.stdout.write(output);
                }
                break;
            case "-t":
                // print the type of the object
                console.log(`Type of object ${commitSHA} is commit`);
                break;
            default:
                throw new Error(`Unknown flag ${flags}`);
        }
        
    }
}

module.exports = CatFileCommand;