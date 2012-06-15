
test/out.js: notification.js notification.css
	component build package.json test/out

clean:
	rm -f test/out.{js,css}

.PHONY: clean