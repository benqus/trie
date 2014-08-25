/**
 * Created by Bence Kormos on 16/08/14.
 */
var Trie = (function () {

    function labelsMatch(label, labels) {
        return (!label || labels.indexOf(label) > -1);
    }

    function addMatchTo(result, word, label) {
        result.push({
            match: word,
            label: label
        });
    }

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
         * @param {string}  str
         * @param {string}  label
         * @param {Array}   result
         * @param {object}  tree
         * @param {boolean} firstCall - TODO: this is not very nice, will refactor later
         */
        function collect(str, label, result, tree, firstCall) {
            var word,
                i;

            if (firstCall && str && tree.hasOwnProperty('$') && labelsMatch(label, tree.$)) {
                addMatchTo(result, str, tree.$);
            }

            for (i in tree) {
                if (i !== '$') {
                    word = str + i;
                    if (
                        tree[i].hasOwnProperty('$') && // character is an end of a word
                        labelsMatch(label, tree[i].$) // labels match, if any
                    ) {
                        addMatchTo(result, word, tree[i].$);
                    }
                    collect(word, label, result, tree[i], false);
                }
            }
        }

        options = (options || {});

        return {
            /**
             * Adds one word to the Trie.
             * @param   {string} word
             * @param   {string} [label]
             * @returns {Trie}
             */
            addWord: function (word, label) {
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
                            tree[letter].$ = [];
                            if (label) {
                                tree[letter].$.push(label);
                            }
                        }
                    } else if (letters.length === 0) {
                        // add label to word if word is already registered
                        tree[letter].$.push(label);
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
             * Or filter words by label:
             * @param   {string} str
             * @param   {string} [label]
             * @returns {Array}
             */
            search: function (str, label) {
                var letters = (str || '').split(''),
                    result  = [],
                    tree    = trie,
                    letter;

                // digging down to the first match of chars
                while (letters.length > 0) {
                    letter = letters.shift();
                    tree = tree[letter];
                }

                collect(str, label, result, tree, true);

                return result;
            }
        };
    };

    return Trie;
}());