const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithm.json').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content) {
  
    fetchContentFromWikipedia = async (content) => {
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey) 
        const wikipediaAlgorithm =  algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponde.get()
        content.sourceContentOriginal = wikipediaContent.content;
    }

    sanitizeContent = async (content) => {
        removeBlankLinesAndMarkdown = (text) => {
            const allLines = text.split('\n');

            const removedMarkDownAndBlankLines =  allLines.filter((line) => {  
                if(line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false
                } 
                return true
            })

            return removedMarkDownAndBlankLines.join(' ')
        }

        removeDateInParentheses = (text) => {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ');
            
        }

        breakContentIntoSentences = (content) => {
            content.sentences = []    
            const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized) 
            sentences.forEach((sentence) => {
                content.sentences.push({
                    text: sentence,
                    keywords: [],
                    images: []
                })
            })

            console.log(content.sentences);
           

        }

          const withoutBlankLinesAndMarkDown = removeBlankLinesAndMarkdown( content.sourceContentOriginal );
          const withoutDateInParentheses = removeDateInParentheses(withoutBlankLinesAndMarkDown);
          content.sourceContentSanitized = withoutDateInParentheses;  
          
         
    }


    await fetchContentFromWikipedia(content);
    await sanitizeContent(content)
    await breakContentIntoSentences(content)
 
  
}



module.exports = robot