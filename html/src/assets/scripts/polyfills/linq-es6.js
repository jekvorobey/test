/* https://github.com/zloirock/core-js */
/* https://github.com/aaronpowell/linq-in-javascript */

'use strict';
import $ from 'core-js/internals/export';

let __extends = function(d, b) {
    for (let p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    d[Symbol.iterator] = function() {
        return d();
    };
};

let fnTrue = function() {
    return true;
};
let fnSelf = function(x) {
    return x;
};

let generator = function*(array) {
    for (let i = 0; i < array.length; i++) {
        yield array[i];
    }
};

let Enumerable = function(array) {
    if (this && this.constructor == Enumerable) {
        throw "This is not a constructable type, don't use the `new` operator";
    }
    let instance = generator.bind(this, array);

    __extends(instance, generator);
    return instance;
};

let first = function(nullable, selector) {
    return function(fn) {
        fn = fn || selector;
        for (let item of this()) {
            if (fn(item)) {
                return item;
            }
        }

        if (nullable) {
            return undefined;
        }
        throw 'Sequence contains no matching elements';
    };
};

let single = function(nullable, selector) {
    return function(fn) {
        fn = fn || selector;
        let matched;
        for (let item of this()) {
            if (fn(item)) {
                if (matched) {
                    throw 'Sequence contains more than one matching element';
                } else {
                    matched = item;
                }
            }
        }

        if (matched) {
            return matched;
        }

        if (!matched && nullable) {
            return undefined;
        }

        throw 'Sequence contains no matching elements';
    };
};

let all = function(fn) {
    for (let x of this()) {
        if (!fn(x)) {
            return false;
        }
    }

    return true;
};

let any = function(fn) {
    fn = fn || fnTrue;

    for (let x of this()) {
        if (fn(x)) {
            return true;
        }
    }
    return false;
};

let count = function(fn) {
    fn = fn || fnTrue;

    let count = 0;
    for (let i of this()) {
        if (fn(i)) {
            count++;
        }
    }
    return count;
};

let aggregate = function(seed, fn, selector) {
    let it = this();

    switch (arguments.length) {
        case 1:
            fn = seed;
            seed = it.next().value;
            break;

        case 2:
            if (typeof seed === 'function') {
                selector = fn;
                fn = seed;
                seed = it.next().value;
            }
            break;
    }
    for (let item of it) {
        seed = fn(seed, item);
    }

    if (selector) {
        return selector(seed);
    }
    return seed;
};

let average = function(fn) {
    let total = 0;
    let count = 0;

    fn = fn || fnSelf;

    for (let item of this()) {
        total += fn(item);
        count++;
    }

    if (count) {
        return total / count;
    }
    throw Error('No items in the collection');
};

let concat = function(col) {
    return ConcatEnumerable(this, col);
};

let contains = function(value, tester) {
    let it = this();

    if (!tester) {
        for (let item of it) {
            if (item === value) {
                return true;
            }
        }
    } else {
        for (let item of it) {
            if (tester(item, value)) {
                return true;
            }
        }
    }
    return false;
};

let where = function(fn) {
    return WhereEnumerable(this, fn);
};

let select = function(fn) {
    return SelectEnumerable(this, fn);
};

let selectMany = function(fn) {
    return SelectManyEnumerable(this, fn);
};

let take = function(count) {
    return TakeEnumerable(this, count || 0);
};

let takeWhile = function(fn) {
    return TakeEnumerable(this, fn || 0);
};

let skip = function(count) {
    return SkipEnumerable(this, count || 0);
};

let skipWhile = function(fn) {
    return SkipEnumerable(this, fn || 0);
};

let toArray = function() {
    let arr = [];
    for (let i of this()) {
        arr.push(i);
    }
    return arr;
};

generator.where = where;
generator.filter = where;

generator.select = select;
generator.map = select;
generator.selectMany = selectMany;

generator.first = first(false, fnTrue);
generator.firstOrDefault = first(true, fnTrue);

generator.single = single(false, fnTrue);
generator.singleOrDefault = single(true, fnTrue);

generator.all = all;
generator.any = any;
generator.count = count;
generator.aggregate = aggregate;
generator.average = average;
generator.concat = concat;
generator.contains = contains;

generator.take = take;
generator.takeWhile = takeWhile;

generator.skip = skip;
generator.skipWhile = skipWhile;

generator.toArray = toArray;

let ConcatEnumerable = (function(__super) {
    return function(parent, col) {
        if (col.constructor === Array) {
            col = col.asEnumerable();
        }

        function* concat(col) {
            for (let item of parent()) {
                yield item;
            }

            for (let item of col()) {
                yield item;
            }
        }

        let x = concat.bind(this, col);
        __extends(x, __super);
        return x;
    };
})(generator);

let WhereEnumerable = (function(__super) {
    return function WhereEnumerable(parent, fn) {
        function* where(fn) {
            let index = 0;
            for (let x of parent()) {
                if (fn(x, index)) {
                    yield x;
                }
                index++;
            }
        }

        let x = where.bind(this, fn);
        __extends(x, __super);
        return x;
    };
})(generator);

let SelectEnumerable = (function(__super) {
    return function(parent, fn) {
        let selector = function*(parent, fn) {
            let index = 0;
            for (let item of parent()) {
                yield fn(item, index++);
            }
        };

        let instance = selector.bind(this, parent, fn);
        __extends(instance, __super);
        return instance;
    };
})(generator);

let SelectManyEnumerable = (function(__super) {
    return function(parent, colSelector, resultSelector) {
        let selectMany = function*(parent, colSelector, resultSelector) {
            resultSelector =
                resultSelector ||
                function(col, x) {
                    return x;
                };
            let index = 0;

            for (let item of parent()) {
                let arr = colSelector(item, index++);
                for (let i = 0; i < arr.length; i++) {
                    let foo = resultSelector(arr, arr[i]);
                    yield foo;
                }
            }
        };

        let instance = selectMany.bind(this, parent, colSelector, resultSelector);
        __extends(instance, __super);
        return instance;
    };
})(generator);

let RangeEnumerable = (function(__super) {
    return function(start, end) {
        let ranger = function*(start, end) {
            for (let i = 0; i < end; start++, i++) {
                yield start;
            }
        };

        let instance = ranger.bind(this, start, end);
        __extends(instance, __super);
        return instance;
    };
})(generator);

let TakeEnumerable = (function(__super) {
    return function(parent, selector) {
        let taker = function*(parent, selector) {
            let index = 0;
            if (typeof selector === 'number') {
                for (let item of parent()) {
                    if (index < selector) {
                        yield item;
                        index++;
                    } else {
                        break;
                    }
                }
            } else if (typeof selector === 'function') {
                for (let item of parent()) {
                    if (selector(item, index)) {
                        yield item;
                    } else {
                        break;
                    }
                    index++;
                }
            }
        };

        let instance = taker.bind(this, parent, selector);
        __extends(instance, __super);
        return instance;
    };
})(generator);

let SkipEnumerable = (function(__super) {
    return function(parent, selector) {
        let skippy = function*(parent, selector) {
            let index = 0;
            if (typeof selector === 'number') {
                for (let item of parent()) {
                    if (index >= selector) {
                        yield item;
                    }
                    index++;
                }
            } else if (typeof selector === 'function') {
                let flag = false;
                index = -1;
                for (let item of parent()) {
                    index++;
                    if (!flag && !selector(item, index)) {
                        flag = true;
                    }

                    if (flag) {
                        yield item;
                    }
                }
            }
        };

        let instance = skippy.bind(this, parent, selector);
        __extends(instance, __super);
        return instance;
    };
})(generator);

let RepeatEnumerable = (function(__super) {
    return function(item, count) {
        let repeater = function*(item, count) {
            let stripped = JSON.stringify(item);
            for (let i = 0; i < count; i++) {
                yield JSON.parse(stripped);
            }
        };

        let instance = repeater.bind(this, item, count);
        __extends(instance, __super);
        return instance;
    };
})(generator);

Enumerable.range = function(start, end) {
    start = start || 0;
    end = end || 0;

    return RangeEnumerable(start, end);
};

Enumerable.repeat = function(item, count) {
    return RepeatEnumerable(item, count || 0);
};

// Инжекция метода asEnumerable в Array
$(
    { target: 'Array', proto: true, forced: true },
    {
        asEnumerable: function asEnumerable() {
            return Enumerable(this);
        },
    }
);
