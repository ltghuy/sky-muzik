const express = require("express")
const router = express.Router()

const MusicController = require("../../controllers/MusicController")

// getSong
router.get("/song", MusicController.getSong)

// getDetailPlaylist
router.get("/detailplaylist", MusicController.getDetailPlaylist)

// getHome
router.get("/home", MusicController.getHome)

// getTop100
router.get("/top100", MusicController.getTop100)

// getChartHome
router.get("/charthome", MusicController.getChartHome)

// getNewReleaseChart
router.get("/newreleasechart", MusicController.getNewReleaseChart)

// getInfoSong
router.get("/infosong", MusicController.getInfo)

// getArtist
router.get("/artist", MusicController.getArtist)

// getArtistSong
router.get("/artistsong", MusicController.getArtistSong)

// getLyric
router.get("/lyric", MusicController.getLyric)

// search
router.get("/search", MusicController.search)

// getListMV
router.get("/listmv", MusicController.getListMV)

// getCategoryMV
router.get("/categorymv", MusicController.getCategoryMV)

// getVideo
router.get("/video", MusicController.getVideo)

module.exports = router
