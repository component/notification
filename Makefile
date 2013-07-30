
build: notification.css index.js template.js components
	@component build

template.js: template.html
	@component convert $<

components: component.json
	@component install

clean:
	rm -fr build components

.PHONY: clean
