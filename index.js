const readline = require('readline-sync')

function start() {
    const content = {}

    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();
    
    function askAndReturnSearchTerm() {
        return readline.question('Type Wikipedia Search Term: ')
    }

    function askAndReturnPrefix() {
        const prefix = ['Who is', 'What is', 'The history of'];
        const selectedPrefixIndex = readline.keyInSelect(prefix, 'Choose any options: ');
        return prefix[selectedPrefixIndex];
    }

    console.log(content)

}

start();