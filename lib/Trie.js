/**
 * Created by Bence Kormos on 16/08/14.
 */

/**
 *
 * @param    {object}  [options]
 * @property {boolean} [options.caseSensitive]
 * @returns {object}
 * @constructor
 */
var Trie = function (options) {
    /**
     * @private
     * @type {object}
     */
    var trie = {};

    /**
     * Traverses the trie and collects all required words.
     * @private
     * @param {string} str
     * @param {Array}  result
     * @param {object} tree
     */
    function collect(str, result, tree) {
        var word,
            i;

        for (i in tree) {
            if (i !== '$') {
                word = str + i;
                if (tree[i].hasOwnProperty('$')) {
                    result.push(word);
                }
                collect(word, result, tree[i]);
            }
        }
    }

    options = (options || {});

    return {
        /**
         * Adds one word to the Trie.
         * @param   {string} word
         * @returns {Trie}
         */
        addWord: function (word) {
            var letters = word.replace(/\W+/g, '').split(''),
                tree    = trie,
                letter;

            while (letters.length > 0) {
                letter = letters.shift();
                if (!options.caseSensitive) {
                    letter = letter.toLowerCase();
                }
                if (!tree[letter]) {
                    tree[letter] = {};
                    // mark word with a $ sign
                    if (letters.length === 0) {
                        tree[letter]['$'] = 1;
                    }
                }
                tree = tree[letter];
            }

            return this;
        },

        /**
         * Adds all the words provided in a sentence or an array.
         * @param   {string|string[]} words
         * @returns {Trie}
         */
        addWords: function (words) {
            if (!Array.isArray(words)) {
                words = words.split(' ');
            }

            while (words.length > 0) {
                this.addWord(words.shift());
            }

            return this;
        },

        /**
         * Search for words in Trie beginning with:
         * @param   {string} str
         * @returns {Array}
         */
        search: function (str) {
            var letters = str.split(''),
                result  = [],
                tree    = trie,
                letter;

            while (letters.length > 0) {
                letter = letters.shift();
                if (!tree[letter]) {
                    return [];
                }
                tree = tree[letter];
            }

            collect(str, result, tree);

            return result;
        }
    };
};