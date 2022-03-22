const regex = new RegExp(/^(feat|fix|docs|init|test|refactor|ci|revert)(\(.+?\))?: (#[1-9]\d*) [\s\S]*/g);
const commitMsg: string | undefined = process.argv.pop();

if (!commitMsg) {
  process.exitCode = 9;
  throw new Error();
}

if (!regex?.test(commitMsg)) {
  console.error('Invalid commit message format. Correct format: "feat(scope): #issue_num <commit_msg>"');
  process.exitCode = 9;
}
