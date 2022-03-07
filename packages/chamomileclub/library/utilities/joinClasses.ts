type baseType = string | number | undefined | null;
type objectType = { [key: string]: undefined | null | boolean };
type classesType = (baseType | objectType)[];

const joinClasses = (...classes: classesType) => classes.map(_class => {
		if (typeof _class === "string" || _class instanceof String || typeof _class === "number") {
			return _class
		}
		else if (_class instanceof Array) {
			return joinClasses(..._class);
		}
		else if (_class instanceof Object) {
			return Object.entries(_class)
				.map(_class => _class[1] ? _class[0] : null).filter(_class => _class).join(" ");
		}
		else if (_class === undefined || _class === null) {
			return "";
		}
		else {
			throw new TypeError(`Invalid Type of ${typeof _class} supplied to joinClasses`);
		}
	}).join(" ").trim();

export default joinClasses;
