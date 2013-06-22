'use strict';

module.exports = function( grunt ) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		clean: {
			build: [ 'build' ]
		},
		// production pipeline tasks
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			js: {
				src: [ 'src/<%= pkg.name %>.js' ],
				dest: 'app/js/<%= pkg.name %>.js'
			},
			css: {
				src: [
					'build/css/init.css',
					'build/css/clock-layout.css',
					'build/css/card.css'
				],
				dest: 'app/css/<%= pkg.name %>.css'
			},
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'app/js/<%= pkg.name %>.js'
			},
		},
		compass: {
			// TODO compass concat
			// http://stackoverflow.com/questions/9293646/can-compass-merge-css-files
			src: {
				options: {
					sassDir: 'src/sass',
					cssDir: 'build/css',
					environment: 'development'
				}
			},
			app: {
				options: {
					sassDir: 'src/sass',
					cssDir: 'build/css',
					environment: 'production'
				}
			}
		},
		// code quality tasks
		csslint: {
			src: {
				options: {
					csslintrc: 'src/.csslintrc'
				},
				src: [ 'build/**/*.css' ]
			},
			app: {
				options: {
					csslintrc: 'src/.csslintrc'
				},
				src: [ 'app/**/*.css' ]
			},
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: [ 'src/**/*.js' ]
			},
			app: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: [ 'app/**/*.js' ]
			},
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: [ 'jshint:gruntfile' ]
			},
			srcJs: {
				files: '<%= jshint.src.src %>',
				tasks: [ 'jshint:src' ]
			},
			srcCss: {
				files: 'src/sass/*.scss',
				tasks: [ 'compass', 'csslint:src' ]
			},
			appJs: {
				files: '<%= jshint.app.src %>',
				tasks: [ 'jshint:app' ]
			},
			appCss: {
				files: '<%= csslint.app.src %>',
				tasks: [ 'csslint:app' ]
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-compass' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-csslint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	// Default task.
	grunt.registerTask( 'compile', [ 'clean', 'compass:src' ]);
	grunt.registerTask( 'test', [ 'csslint', 'jshint' ]);
	grunt.registerTask( 'produce', [ 'clean', 'compass:app', 'concat' ]);
	// TODO uglify and pass jshint
	grunt.registerTask( 'quality-control', [ 'csslint:app', 'jshint:app' ]);
	grunt.registerTask( 'default', [ 'compile', 'test', 'produce', 'quality-control' ]);

};
