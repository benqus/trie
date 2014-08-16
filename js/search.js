(function () {
    var trie = new Trie(),
        prevText,
        input;

    trie.addWords('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    trie.addWords('Maecenas eleifend euismod mattis.');
    trie.addWords('Praesent sed turpis quis enim semper vehicula.');
    trie.addWords('Vivamus sed egestas sem, at fermentum nisl.');
    trie.addWords('In hac habitasse platea dictumst.');
    trie.addWords('Sed cursus, ligula sit amet ultricies rutrum, mauris metus ultrices tortor, a vestibulum mi diam mattis urna.');
    trie.addWords('Duis iaculis velit dolor, nec facilisis lorem volutpat quis.');
    trie.addWords('Duis dignissim magna quis nisl mattis, sed eleifend leo mollis.');
    trie.addWords('Etiam semper vulputate augue.');
    trie.addWords('Sed vehicula porta volutpat.');
    trie.addWords('Nulla non bibendum eros.');

    function generateItem(word) {
        return '<li class="word">' + word + '</li>';
    }

    function generateList(results, text) {
        if (results.length > 0) {
            return [
                '<ul>',
                results
                    .map(generateItem)
                    .join(''),
                '</ul>'
            ].join('');
        } else {
            return '<p>No words found for &quot;' + text + '&quot;</p>';
        }
    }

    function generateSearchResults() {
        var text = input.value,
            results,
            markup;

        if (text) {
            if (text === prevText) {
                return;
            }

            results = trie.search(text);
            markup = generateList(results, text);
        } else {
            markup = '<p>Please type in at least one letter to search</p>'
        }

        prevText = text;

        document.getElementById('results').innerHTML = markup;
    }

    window.addEventListener('load', function () {
        input = document.getElementById('search');
        input.addEventListener('keyup', generateSearchResults);
        input.focus();

        generateSearchResults();
    });

}());