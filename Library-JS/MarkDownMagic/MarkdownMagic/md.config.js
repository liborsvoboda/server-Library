/* CLI markdown.config.js file example */
module.exports = {
  // handleOutputPath: (currentPath) => {
  //   const newPath =  'x' + currentPath
  //   return newPath
  // },
  // handleOutputPath: (currentPath) => {
  //   const newPath = currentPath.replace(/fixtures/, 'fixtures-out')
  //   return newPath
  // },
  transforms: {
    /* Match <!-- AUTO-GENERATED-CONTENT:START (transformOne) --> */
    transformOne() {
      return `This section was generated by the cli config md.config.js file`
    },
    functionName({options}) {
      console.log('Options in plugin', options)
      return `xyz`
    }
  }
}