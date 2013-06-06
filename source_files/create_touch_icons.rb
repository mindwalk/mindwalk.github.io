require "fileutils"

original = ARGV[0]

[57, 72, 114, 144].each do |size|
  `convert -resize #{size}x#{size} #{original} apple-touch-icon-#{size}x#{size}-precomposed.png`
end

FileUtils.copy "apple-touch-icon-57x57-precomposed.png", "apple-touch-icon-precomposed.png"
FileUtils.copy "apple-touch-icon-57x57-precomposed.png", "apple-touch-icon.png"

`convert -resize x32 -gravity center -crop 32x32+0+0 #{original} -flatten -colors 256 -background transparent favicon.ico`
