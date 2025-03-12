import SweetAlert, { showSweetAlert } from "@/components/sweetalert";
import { APP_COLOR } from "@/utils/constant";
import { Helper } from "@/utils/helper";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from 'react-native-gifted-charts';
const width = Dimensions.get("window").width + 10;
const arrInfo = [
    { label: "Kế toán", color: APP_COLOR.RED },
    { label: "Bảo trì", color: APP_COLOR.BLUE },
    { label: "Chữ ký số", color: APP_COLOR.BG_ORANGE },
    { label: "Hóa đơn", color: APP_COLOR.PURPLE }
]
interface IData {
    month: number,
    qtyAcc: number,
    qtyInv: number,
    qtyMaintaince: number,
    qtyToken: number
}
interface IProgs {
    data: IData[],
    index: number
}
const HomeBarChart = (progs: IProgs) => {
    const { data, index } = progs;
    const indexFrom = data.length > 3 ? data.length - 3 : 0;
    let barData: any = [], maxValue = 0;
    for (let i = indexFrom; i < data.length; i++) {
        const item = data[i];
        if (item.qtyAcc > maxValue) maxValue = item.qtyAcc;
        barData.push({
            value: item.qtyAcc,
            label: item.month,
            spacing: 1,
            labelWidth: 62,
            labelTextStyle: { color: 'gray' },
            frontColor: arrInfo[0].color,
            title: arrInfo[0].label
        });
        if (item.qtyInv > maxValue) maxValue = item.qtyInv;
        barData.push({ value: item.qtyInv, frontColor: arrInfo[1].color, title: arrInfo[1].label });
        if (item.qtyMaintaince > maxValue) maxValue = item.qtyMaintaince;
        barData.push({ value: item.qtyMaintaince, frontColor: arrInfo[2].color, title: arrInfo[2].label });
        if (item.qtyToken > maxValue) maxValue = item.qtyToken;
        barData.push({ value: item.qtyToken, frontColor: arrInfo[3].color, title: arrInfo[3].label, spacing: 10 });
    }
    maxValue += maxValue * 10 / 100;
    const renderTitle = () => {
        return (
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                {
                    arrInfo.map((item: any) => {
                        return (
                            <Text key={item.label} style={{ borderLeftWidth: 10, borderLeftColor: item.color, width: 100, marginBottom: 10 }}> {item.label}</Text>
                        );
                    })
                }
            </View>
        )
    }

    return (
        <View
            style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: APP_COLOR.PRIMARY2,
                backgroundColor: APP_COLOR.SECOND2,
                margin: 5,
                paddingVertical: 9,
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "600", alignSelf: "center" }}>Hợp đồng qua các tháng</Text>
                <BarChart
                    data={barData}
                    barWidth={15}
                    spacing={1}
                    roundedTop
                    roundedBottom
                    hideRules
                    xAxisThickness={0}
                    yAxisThickness={0}
                    yAxisTextStyle={{ color: 'gray' }}
                    noOfSections={5}
                    maxValue={maxValue}
                    height={width / 3 - 25}
                    onPress={(v: any) => {
                        // showSweetAlert({
                        //     title: v.title,
                        //     text: "Số lượng: " + v.value,
                        //     showCancelButton: false,
                        //     confirmButtonText: 'Xác nhận',
                        //     type: 'info'
                        // });
                        Helper.toastShow(v.title + " số lượng: " + v.value, true);
                    }}
                />
            </View>
            {renderTitle()}
            {/* <SweetAlert /> */}
        </View>
    );
}
export default HomeBarChart;