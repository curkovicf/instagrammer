const regex = new RegExp(/^(feat|fix|docs|init|test|refactor|ci|revert)(\(.+?\))?: (#[1-9]\d*) [\s\S]*/g);
const commitMsg = process.argv.pop();

// console.log('COMIT MSG AA ', process.argv);
// console.log('COMIT MSG ', commitMsg.pop());
console.log('REGEX ', regex);
// console.log('REGEX ', regex);
console.log(regex?.test(commitMsg));
// if (!regex.test(commitMsg)) {
//   console.error('Invalid commit message format. Correct format: "feat(scope): #issue_num <commit_msg>"');
//   // process.exitCode = 9;
// }

