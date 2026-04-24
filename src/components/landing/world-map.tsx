import { FC, useEffect, useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps"

interface WorldMapSimpleProps {
  highlightedCountries: string[]
}

type GeographyData = Record<string, unknown>

let geographyDataCache: GeographyData | null = null
let geographyDataPromise: Promise<GeographyData> | null = null

const loadWorldMapGeography = async (): Promise<GeographyData> => {
  const response = await fetch("/geo.json")

  if (!response.ok) {
    throw new Error(`Failed to load map data: ${response.status}`)
  }

  return response.json()
}

export const preloadWorldMapGeography = (): Promise<GeographyData> => {
  if (geographyDataCache) {
    return Promise.resolve(geographyDataCache)
  }

  if (!geographyDataPromise) {
    geographyDataPromise = loadWorldMapGeography().then((data) => {
      geographyDataCache = data
      return data
    })
  }

  return geographyDataPromise
}

export const WorldMapSimple: FC<WorldMapSimpleProps> = ({
  highlightedCountries,
}) => {
  const [geographyData, setGeographyData] = useState<GeographyData | null>(
    geographyDataCache
  )

  useEffect(() => {
    let isMounted = true

    preloadWorldMapGeography()
      .then((data) => {
        if (isMounted) {
          setGeographyData(data)
        }
      })
      .catch((error) => {
        console.error("Failed to preload world map geography", error)
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (!geographyData) {
    return (
      <div className="flex aspect-[2/1] w-full items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] animate-pulse">
        <span className="text-sm text-white/60">Loading map...</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <ComposableMap
        projectionConfig={{ scale: 145 }}
        width={800}
        height={400}
        viewBox="0 0 800 400"
        style={{ width: "100%", height: "100%" }}
      >
        <Graticule stroke="#DDD" strokeWidth={0.2} />

        <Geographies geography={geographyData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name || ""
              const isHighlighted = highlightedCountries.includes(countryName)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? "red" : "#EEE"}
                  stroke="#FFF"
                  className={isHighlighted ? "red-pulse" : ""}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: isHighlighted ? "darkred" : "red",
                      outline: "none",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
