const args = process.argv;
const pattern = "/^(feat|fix|docs|init|test|refactor|ci|revert)(\(.+?\))?: (#[1-9]\d*) [\s\S]*/g";

console.log(args);
