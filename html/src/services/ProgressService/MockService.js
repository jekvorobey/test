module.exports = class MockProgressService {
    start() {
        return this;
    }

    set(num) {
        return this;
    }

    get() {
        return 0;
    }

    increase(num) {
        return this;
    }

    decrease(num) {
        return this;
    }

    finish() {
        return this;
    }

    pause() {
        return this;
    }

    hide() {
        return this;
    }

    fail() {
        return this;
    }
};
