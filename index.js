const readline = require('readline-sync')
const robots = {
    text: require('./robots/text')
}

async function start() {
    const content = {}

    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();

    await robots.text(content)
    
    function askAndReturnSearchTerm() {
        return readline.question('Type Wikipedia Search Term: ')
    }

    function askAndReturnPrefix() {
        const prefix = ['Who is', 'What is', 'The history of'];
        const selectedPrefixIndex = readline.keyInSelect(prefix, 'Choose any options: ');
        return prefix[selectedPrefixIndex];
    }

    //console.log(content)

}

start();