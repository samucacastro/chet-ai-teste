import youtube from 'youtube-sr';
import YoutubeMusicApi from "youtube-music-api";

export const getYoutubeVideo = async (req, res) => {
	const src = req.query.src;
	try {
		const videoUrl = await youtube.default.searchOne(src);
		return res.json({ url: videoUrl.url })
	} catch (error) {
		console.log(error);
		return res.send("ERRO")
	}
}

export const getYoutubeMusic = async (req, res) => {
	const src = req.query.src;
	try {
		const api = new YoutubeMusicApi();
		api.initalize()
			.then(info => {
				api.search(src, "song").then(result => {
					return res.status(200).json({ url: "https://music.youtube.com/watch?v=" + result.content[0]?.videoId });
				});
			});
	} catch (error) {
		console.log(error);
		return res.send("ERRO")
	}
}