import * as THREE from 'three'
import dat from '../sceneAssets/data/bsc5.dat'
import lines from '../sceneAssets/data/ConstellationLines.dat'

export default function DatLoader() {

    let linesOrder = {}

    const constellationLinesDat = new XMLHttpRequest()
    constellationLinesDat.open('GET', lines, false)
    constellationLinesDat.onreadystatechange = function () {
        if (constellationLinesDat.readyState === 4) {
            const constellationLinesData = constellationLinesDat.responseText.split("\n")
            constellationLinesData.forEach(row => {
                if (!row.startsWith("#") && row.length > 1) {
                    const rowData = row.split(/[ ,]+/)
                    linesOrder[rowData[0].toLowerCase()] = rowData.slice(2)
                }
            })
        }
    }
    constellationLinesDat.send()
    // console.log(linesOrder['pyx'])

    let positions = {}
    let pos = []
    let i = 0;
    const bsc5dat = new XMLHttpRequest()
    bsc5dat.open('GET', dat, false)
    bsc5dat.onreadystatechange = function () {
        if (bsc5dat.readyState === 4) {
            const starData = bsc5dat.responseText.split("\n")
            starData.forEach(function(row, id) {
                // const id = Number(row.slice(0, 4))
                // console.log()
                // console.log(id)
                if(row.slice(4, 14).trim() !== ""){
                    positions[parseInt(row.slice(0,4))] = {
                        name: row.slice(4, 14).trim(),
                        coords: new THREE.Vector3().setFromSphericalCoords(
                            180,
                            (90 - Number(row.slice(96, 102))) / 180 * Math.PI,
                            Number(row.slice(90, 96)) / 180 * Math.PI),
                    }
                }

                if((id+1) === parseInt(linesOrder['pyx'][i])){
                    console.log(row)
                    const v = new THREE.Vector3().setFromSphericalCoords(
                        180,
                        (90 - Number(row.slice(96, 102))) / 180 * Math.PI,
                        Number(row.slice(90, 96)) / 180 * Math.PI)
                    console.log('match')
                    pos.push(v.x, v.y, v.z)
                    i++
                }
            })
        }
    }
    bsc5dat.send()
    // console.log(pos)
    return {linesOrder,positions,pos}
}