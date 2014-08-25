trie
====

    var trie = Trie();
    
    // single word
    trie.addWord('bla');
    
    // list of words
    trie.addWords(['blur', 'blurry', 'blend', 'bond', 'gum']);
    
    // a whole sentence
    trie.addWords(['blurry blend bond gum']);

## Search

### Example 1:

    trie.search('g');

Will return:

    {
        match: 'gum',
        labels: []
    }
    
### Example 2:

    trie.search('b');

Will return:

    [
        {match: 'bla', labels: []},
        {match: 'blend', labels: []},
        {match: 'blur', labels: []},
        {match: 'blurry', labels: []},
        {match: 'bond', labels: []}
    ];
    
## Labeling

    trie.addWord('bla', 'a');
    trie.addWord('bla', 'b');
    trie.addWord('blur', 'a');
    trie.addWord('blurry', 'b');
    trie.addWord('blurry', 'c');
    
### Example 1:

    trie.search('', 'a');

Will return:

    [
        {match: 'bla', labels: ['a', 'b']},
        {match: 'blur', labels: ['a', 'b']}
    ];

### Example 2:

    trie.search('blu', 'b');

Will return:

    [
        {match: 'bla', labels: ['a', 'b']},
        {match: 'blurry', labels: ['b', 'c']}
    ];
    