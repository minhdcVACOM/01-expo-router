import VcCadView from "@/components/vcCardView";
import { apiGetDashboardCode } from "@/utils/apiHome";
import { APP_COLOR } from "@/utils/constant";
import { Helper } from "@/utils/helper";
import { getBaseUrl } from "@/utils/vcaxios";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import HomeSticky from "./homeSticky";
import empty_logo from "@/assets/images/auth/empty_logo.png";
const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.8)",
        padding: 10,
        alignItems: "center",
        gap: 10,
        marginHorizontal: 10,
        borderRadius: 10
    },
    titleFlatList: {
        color: "#fff",
        fontWeight: "bold",
        margin: 10,
        fontSize: 20,
        paddingLeft: 20
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: "center",
        height: 100
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: APP_COLOR.BG_DARKRED
    }
})
interface IData {
    id: string,
    userId: string,
    name: string,
    imgSrc: string,
    birthDay: string,
}
const HomeTopList = () => {
    const [data, setData] = useState<IData[]>([]);
    useEffect(() => {
        const getDataBirthDay = async () => {
            const baseUrl = await getBaseUrl();
            await apiGetDashboardCode("TPL_LST_EMPLOYEE_BIRTHDAY", res => {
                res.data.forEach((item: any) => item.imgSrc = baseUrl + item.imgSrc);
                setData(res.data)
            });
        }
        getDataBirthDay();
    }, []);
    return (
        <View>
            <HomeSticky />
            <VcCadView cardStyle={styles.card}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled={true}
                    alwaysBounceVertical={false}
                >
                    {/* {data.map(item => {
                        return (
                            <View style={styles.item} key={item.userId}>
                                <Image style={styles.image} source={{ uri: item.imgSrc }} />
                                <View>
                                    <Text style={{ fontWeight: "600", fontSize: 18 }}>{item.name}</Text>
                                    <Text style={{ color: APP_COLOR.GRAYDARK, fontStyle: "italic" }}>{Helper.formatDate(item.birthDay)}</Text>
                                </View>
                            </View>
                        )
                    })} */}
                    <FlatList
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        numColumns={Math.ceil(data.length) ?? 1}
                        key={Math.ceil(data.length) ?? 1}
                        keyExtractor={(_, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        renderItem={({ item, index }) => {
                            const isHaveLogo = item.imgSrc.includes("roman-clip-art") ? false : true;
                            return (
                                <View style={styles.item}>
                                    <Image style={styles.image} source={isHaveLogo ? { uri: item.imgSrc } : empty_logo} />
                                    <View>
                                        <Text style={{ fontWeight: "600", fontSize: 18 }}>{item.name}</Text>
                                        <Text style={{ color: APP_COLOR.GRAYDARK, fontStyle: "italic" }}>{Helper.formatDate(item.birthDay)}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </ScrollView>
            </VcCadView>
            <Text style={styles.titleFlatList}>Hỗ trợ nhiều nhất</Text>
        </View>
    );
}
export default HomeTopList;