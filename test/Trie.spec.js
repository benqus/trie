(function () {

    var assert = chai.assert;

    describe('Trie', function () {

        it('can search for an INCOMPLETE word', function () {
            var trie = new Trie();

            trie.addWord('bla');
            trie.addWord('blur');
            trie.addWord('blurry');

            assert.deepEqual(trie.search('blu'), [
                {
                    match: 'blur',
                    label: []
                },
                {
                    match: 'blurry',
                    label: []
                }
            ]);
        });

        it('can search for an COMPLETE word', function () {
            var trie = new Trie();

            trie.addWord('bla');
            trie.addWord('blur');
            trie.addWord('blurry');

            assert.deepEqual(trie.search('blur'), [
                {
                    match: 'blur',
                    label: []
                },
                {
                    match: 'blurry',
                    label: []
                }
            ]);
        });

        it('can search for an INCOMPLETE words filtered by a label', function () {
            var trie = new Trie();

            trie.addWord('bla', 'b');
            trie.addWord('blur', 'c');
            trie.addWord('blurry', 'd');
            trie.addWord('blurry', 'e');
            trie.addWord('blurry', 'f');

            assert.deepEqual(trie.search('blu', 'e'), [
                {
                    match: 'blurry',
                    label: ['d', 'e', 'f']
                }
            ]);
        });

        it('adds multiple labels to the same word', function () {
            var trie = new Trie();

            trie.addWord('blurry', 'd');
            trie.addWord('blurry', 'e');
            trie.addWord('blurry', 'f');

            assert.deepEqual(trie.search('blu'), [
                {
                    match: 'blurry',
                    label: ['d', 'e', 'f']
                }
            ]);
        });

        it('cannot find word without the specified label', function () {
            var trie = new Trie();

            trie.addWord('bla', 'b');
            trie.addWord('bla', 'e');
            trie.addWord('blood', 'f');
            trie.addWord('blur', 'c');
            trie.addWord('blur', 'e');
            trie.addWord('blurry', 'd');
            trie.addWord('blurry', 'e');

            assert.deepEqual(trie.search('bla', 'a'), []);
        });

        it('can search for all words filtered by a COMMON label', function () {
            var trie = new Trie();

            trie.addWord('bla', 'b');
            trie.addWord('bla', 'e');
            trie.addWord('blood', 'f');
            trie.addWord('blur', 'c');
            trie.addWord('blur', 'e');
            trie.addWord('blurry', 'd');
            trie.addWord('blurry', 'e');

            assert.deepEqual(trie.search('', 'e'), [
                {
                    match: 'bla',
                    label: ['b', 'e']
                },
                {
                    match: 'blur',
                    label: ['c', 'e']
                },
                {
                    match: 'blurry',
                    label: ['d', 'e']
                }
            ]);
        });

    });

}());