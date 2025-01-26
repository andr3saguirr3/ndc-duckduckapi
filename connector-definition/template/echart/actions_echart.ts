import * as echarts from "echarts";
import { Buffer } from "buffer";
import { svg2png } from "../svg2png/functions";  // todo test if this will comeback

// function getVirtualData(year: string) {
//     const date = +echarts.time.parse(year + "-01-01");
//     const end = +echarts.time.parse(year + "-12-31");
//     const dayTime = 3600 * 24 * 1000;
//     const data: [string, number][] = [];
//     for (let time = date; time <= end; time += dayTime) {
//         data.push([
//             echarts.time.format(time, "{yyyy}-{MM}-{dd}", false),
//             Math.floor(Math.random() * 10000),
//         ]);
//     }
//     return data;
// }

const echartToFile = function (options: object) {
    type EChartsOption = echarts.EChartOption;

    const chart = echarts.init(null, {}, {
        renderer: "svg", // must use SVG rendering mode
        // ssr: true, // enable SSR
        width: 1200, // need to specify height and width  //todo
        height: 900,
    });

    const option = 
    
    {
        visualMap: [{
            show: false,
            min: 0,
            max: 10000,
        }],
        calendar: {
            range: "2024",
            dayLabel: {
                firstDay: 1,
                nameMap: ["D", "L", "M", "M", "J", "V", "S"],
            },
            monthLabel: {
                nameMap: [
                    "Ene",
                    "Feb",
                    "Mar",
                    "Abr",
                    "May",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dic",
                ],
            },
        },
        series: [{
            type: "heatmap",
            coordinateSystem: "calendar",
            data: [["2024-10-15", 9000]], //getVirtualData('2017')
        }],
    };


    if (options) {
        // console.log(option);
        option && chart.setOption(option );
        
        const svgStr = chart.getDataURL({ type: 'svg' });
        chart.dispose();
        console.log(svgStr);

        // const response = svg2png(svgStr, "echart.svg");
        // return response;
        return svgStr;
        // return new File([Buffer.from(svgStr)],"echart.svg");
    } else {
        return null;
    }
};

export { echartToFile };
