
build: notification.css index.js template.js components
	@component build

template.js: template.html
	@component convert $<

components:
	@component install

clean:
	@rm -fr build components

test: build
	@open test/index.html

.PHONY: clean test
