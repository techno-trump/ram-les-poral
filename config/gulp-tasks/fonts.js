import gulp from "gulp";
import fs from "fs";
import fonter from "gulp-fonter";
import ttfToWoff2Converter from "gulp-ttf2woff2";

const otfToTtf = () => {
	const { src, dest } = app.gulp;

	return src(`${app.path.src.fonts}/*.otf`)
		.pipe(app.plugins.plumber({
			errorHandler: app.plugins.notify.onError({
				title: "Fonts (otfToTtf)",
				message: "Error: <%= error.message %>"
			})
		}))
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(app.path.src.fonts));
}
const ttfToWoff = () => {
	const { src, dest } = app.gulp;

	return src(`${app.path.src.fonts}/*.ttf`)
		.pipe(app.plugins.plumber({
			errorHandler: app.plugins.notify.onError({
				title: "Fonts (ttfToWoff)",
				message: "Error: <%= error.message %>"
			})
		}))
		.pipe(fonter({
			formats: ['woff']
		}))
		.pipe(dest(app.path.build.fonts));
}
const ttfToWoff2 = () => {
	const { src, dest } = app.gulp;

	return src(`${app.path.src.fonts}/*.ttf`)
		.pipe(app.plugins.plumber({
			errorHandler: app.plugins.notify.onError({
				title: "Fonts (ttfToWoff2)",
				message: "Error: <%= error.message %>"
			})
		}))
		.pipe(ttfToWoff2Converter())
		.pipe(dest(app.path.build.fonts));
}
export const generateFontFaces = (cb) => {
	const formatMap = {
		"woff": "woff",
		"woff2": "woff2",
		"ttf": "truetype",
	};
	const weightMap = {
		"thin": 100,
		"extralight": 200, "extra-light": 200, "extra_light": 200, "extra light": 200,
		"light": 300,
		"normal": 400,
		"regular": 400,
		"medium": 500,
		"demibold": 600, "demi-bold": 600, "demi_bold": 600, "demi bold": 600,
		"semibold": 600, "semi-bold": 600, "semi_bold": 600, "semi bold": 600,
		"bold": 700,
		"black": 900, "havy": 900,
	};
	const wd = "[\\s_\\-]*";
	const weightPatterns = [
		"thin", "100",
		`extra${wd}light`, `ultra${wd}light`, "200",
		"light", "300",
		"normal", "regular", "400",
		"medium", "500",
		`demi${wd}Bold`, `semi${wd}bold`, "600",
		`bold`, "700",
		`black`, `havy`, "900",
	].join("|");
	const stylePatterns = [
		"italic",
		"normal",
		"oblique"
	].join("|");
	const formatPatterns = [
		"otf",
		"ttf",
		"woff",
		"woff2",
	].join("|");
	const fileNamePattern = new RegExp(`(.+?)${wd}(${weightPatterns})+(${stylePatterns})*.*?\\.(${formatPatterns})$`, "i");
	const cache = {};
	const scssPath = `${app.path.src.scssRoot}/common/fonts.scss`;
	const fd = fs.openSync(scssPath, "wx");

	const files = fs.readdirSync(app.path.build.fonts);
	try {
		files.forEach((fileName) => {
			const match = fileName.match(fileNamePattern);
			if (!match) {
				throw new Error(`Font file name <${fileName}> doesn't match the pattern`);
			}
			let [__, name, weight, style, format] = match;
				console.log(`Parse result: ${name}; weight: ${weight}; style: ${style}; format: ${format}`);
			weight = weight && weight.toLowerCase() || "normal";
			format = format.toLowerCase();
			style = style && style.toLowerCase() || "normal";
			if (!weightMap[weight] || !formatMap[format]) {
				throw new Error(`Can't recognize file format: ${fileName}; weight: ${weight}; style: ${style}; format: ${format}`);
			}
			
			if (!cache[name]) {
				cache[name] = {
					[weight]: {
						[style]: [[fileName, format]]
					}
				};
			} else if (!cache[name][weight]) {
				cache[name][weight] = {
					[style]: [[fileName, format]]
				};
			} else if (!cache[name][weight][style]) {
				cache[name][weight][style] = [[fileName, format]];
			} else {
				cache[name][weight][style].push([fileName, format]);
			}
		});

		Object.keys(cache).forEach((fontName) => {
			const byWeight = cache[fontName];
			Object.keys(byWeight).forEach((fontWeight) => {
				const byStyle = cache[fontName][fontWeight];
				Object.keys(byStyle).forEach((fontStyle) => {
					const formats = cache[fontName][fontWeight][fontStyle];
					const fontFace = _generateFontFace(fontName, fontWeight, fontStyle, formats);
					fs.writeSync(fd, fontFace, null);
				});
			});
		});
	} catch(err) {
		fs.closeSync(fd);
		fs.rmSync(scssPath);
		throw new Error(err);
	}
	cb();
	function _generateFontFace(fontName, fontWeight, fontStyle, formats) {
		
		const sources = formats.map(([fileName, ext]) => {
			const format = formatMap[ext];
			return `url('../fonts/${fileName}') format('${format}')`;
		}).join(",");

		return `@font-face {\n\tfont-family: '${fontName}';\n\tsrc: local('☺'), ${sources};\n\tfont-weight: ${weightMap[fontWeight]};\n\tfont-style: ${fontStyle};\n}\n`;
	}
}

export const buildFonts = gulp.series(otfToTtf, ttfToWoff, ttfToWoff2, generateFontFaces);



