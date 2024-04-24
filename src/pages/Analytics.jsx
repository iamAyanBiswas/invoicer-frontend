import React, { useEffect, useState, useRef } from "react";
import './Analytics.css'
import Profile from "../component/Profile";
import { Chart } from "react-google-charts";
function Analytics() {
    let [chartWidth, setChartWidth] = useState("95vw")
    let [dayChartData, setDayChartData] = useState(null)
    let [weekChartData, setWeekChartData] = useState(null)
    let [login, setLogin] = useState(false)


    useEffect(() => {
        let width = window.innerWidth
        let height = window.innerHeight
        if (width < 550) { setChartWidth(chartWidth = "100vw") }
        else { setChartWidth(chartWidth = "95vw") }
    }, [])
    useEffect(() => {
        let analyticsData = () => {
            let accessToken = localStorage.getItem('accessToken');
            let refreshToken = localStorage.getItem('refreshToken');
            let xx = " "
            const headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken},${refreshToken}`
            });
            fetch('http://localhost:3000/api/user/analytics', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ xx })
            })
                .then((res) => {
                    return res.json()
                })
                .then(res => {
                    res.data.accessToken && localStorage.setItem('accessToken', res.data.accessToken)
                    res.data.refreshToken && localStorage.setItem('refreshToken', res.data.refreshToken)
                    if (res.message === "Refresh Token sucessfull") { analyticsData() }
                    else {
                        setDayChartData(dayChartData = res.data.perDay)
                        setWeekChartData(weekChartData = res.data.perWeek)
                        setLogin(login = true)
                    }
                })
                .catch(err => {
                })

        }
        analyticsData()
    }, [])


    const options1 = {
        chart: {
            title: "Daily sales (7 days)",
            subtitle: "in INR",
        }
    };
    const options2 = {
        chart: {
            title: "Weekly sales (3 month)",
            subtitle: "in INR",
        }
    };

    if (login) {
        return (
            <div className="page-analytics">
                <div className="analytics-nav">
                    <div className="analytics-nav-heading">Analytics</div>
                    <div><Profile /></div>
                </div>
                <div className="line-chart-div-one">

                    <Chart
                        chartType="Line"
                        width={chartWidth}
                        height="400px"
                        data={dayChartData}
                        options={options1}
                    />
                </div>
                <div className="line-chart-div-one">

                    <Chart
                        chartType="Line"
                        width={chartWidth}
                        height="400px"
                        data={weekChartData}
                        options={options2}
                    />
                </div>
            </div>
        )
    }
    else {
        return (
            <>
                <div></div>
            </>
        )
    }
}
export default Analytics