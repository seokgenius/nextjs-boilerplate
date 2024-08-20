module.exports = {
    parserPreset: {
      name: 'conventional-changelog-conventionalcommits',
    //   parserOpts: {
    //     issuePrefixes: [''], // 이슈 번호 접두사
    //   },
    },
    /** 0: Pass / 1: Warning / 2: Error */
    rules: {
      'header-max-length': [2, 'always', 100], // 헤더의 최대 글자수는 100자
      'header-case': [0], // 헤더 대소문자 구분 검증 안함
      'type-enum': [ // 헤더의 타입 검사, 아래 배열의 내용만 들어올 수 있음
        2,
        'always',
        [
          'feat',
          'fix',
          'hotfix',
          'design',
          'style',
          'refactor',
          'comment',
          'test',
          'docs',
          'rename',
          'remove',
          'chore',
          'ci',
          'build',
          'pref',
        ],
      ],
      'type-empty': [2, 'never'], // 헤더의 타입은 항상 있어야함
      'type-case': [2, 'always', 'lower-case'], // 헤더의 타입은 소문자로만 작성
      'subject-empty': [2, 'never'], // 헤더의 제목은 항상 있어야함
      'subject-case': [0], // 헤더의 제목 대소문자 구분 검증 안함
      'subject-full-stop': [2, 'never', '.'], // 헤더의 제목 마지막은 마침표 없어야함
      'body-empty': [1, 'never'], // 내용은 없어도 되지만 warning
      'body-leading-blank': [0], // 바디 위에 공백이 있는지 확인 안함
      'body-max-line-length': [2, 'always', 100], // 바디 최대 글자 수 100자
      'references-empty': [1, 'never'], // 이슈 참조(refs:) 없어도 되지만 warning
      'footer-empty': [1, 'never'], // 푸터는 비어있어도 되지만 warning
      'footer-leading-blank': [0], // 푸터 위에 공백이 있는지 확인 안함
      'footer-max-line-length': [2, 'always', 100], // 푸터의 최대 글자 수 100자
    },
  };