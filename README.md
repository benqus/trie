trie
====

    var trie = Trie();
    
    // single word
    trie.addWord('bla');
    
    // list of words
    trie.addWords(['blur', 'blurry', 'blend', 'bond', 'gum']);
    
    // a whole sentence
    trie.addWords(['blurry blend bond gum']);
    
    // search
    trie.search('g'); // >> ['gum']
    trie.search('b'); // >> ['bla', 'blend', 'blur', 'blurry', 'bond'];
    trie.search('blur'); // >> ['blur', 'blurry'];
