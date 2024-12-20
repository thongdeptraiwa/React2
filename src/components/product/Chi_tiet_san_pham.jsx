import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, ScrollView, Pressable, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../Custom/CustomButton';
import Item_topping from '../Item/Item_topping';
import { apiChiTietSanPham } from '../../rtk/API'
import { useSelector, useDispatch } from 'react-redux'
import { addItemToCart } from '../../rtk/Reducer'

const Chi_tiet_san_pham = (props) => {

    const { route, navigation } = props;
    const { params } = route;

    const data_topping = [
        {
            ID_topping: "1",
            ten_topping: "Rau",
            gia_topping: "0đ",
            img_topping: "https://scontent.xx.fbcdn.net/v/t1.15752-9/449764124_482530004569871_8569604232619194359_n.png?_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_ohc=5UKbIA-zZoMQ7kNvgHxBber&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QFmOrCr6_shr_N9bGkwj83_u_UB3ewRmxLeueTTsn98UQ&oe=66B436C0",
        },
        {
            ID_topping: "2",
            ten_topping: "Ớt",
            gia_topping: "0đ",
            img_topping: "https://scontent.xx.fbcdn.net/v/t1.15752-9/449503795_1129726468118910_463669874215149236_n.png?_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_ohc=sGaaHb5grf0Q7kNvgFUQUVH&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QEwAStsb1xDhhDekWarBpKQnuKSZjRxGsvkYsc7beCTqQ&oe=66B45B38",
        },
        {
            ID_topping: "3",
            ten_topping: "Trứng",
            gia_topping: "5.000đ",
            img_topping: "https://scontent.xx.fbcdn.net/v/t1.15752-9/449058942_2874377259368312_4522314359477502099_n.png?_nc_cat=101&ccb=1-7&_nc_sid=0024fc&_nc_ohc=1TOhOb0R0T4Q7kNvgGTblEM&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QGhGMvzMcoJHjanZwGpIOLB8BglayadRNfeVZ1dzO41bA&oe=66B4586A",
        },
    ];

    //api
    const token = useSelector(state => state.app.token)
    const dispatch = useDispatch()
    const [Product, setProduct] = useState(null);
    const getChiTietSanPham = async () => {
        try {
            const result = await dispatch(apiChiTietSanPham({
                _id_san_pham: params._id,
                token: token,
            }))
            //console.log(result.payload)
            setProduct(result.payload)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getChiTietSanPham();
        return () => {
        }
    }, [params._id])

    //format vnd
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    //console.log("cart: ",cart);

    //thêm vào giở hàng
    const addToCart = () => {
        const item = {
            _id: Product._id,
            ten_san_pham: Product.ten_san_pham,
            gia: Product.gia,
            img: Product.img,
            so_luong: 1,
            isCheckBox: false,
        }
        dispatch(addItemToCart(item));
    }


    return (
        <SafeAreaView>

            {
                Product ?
                    <View style={styles.container}>
                        {/* header */}
                        <View>
                            {/* img */}
                            <Image
                                style={{ width: 400, height: 400 }}
                                source={{ uri: Product.img }}
                                resizeMode='contain' />
                            {/* back */}
                            <TouchableOpacity style={{ width: 50, height: 50, position: 'absolute', marginLeft: -15 }} onPress={() => navigation.goBack()}>
                                <Image
                                    style={{ width: "100%", height: "100%" }}
                                    source={require('../../img/Icon_back.png')}
                                    resizeMode='contain' />
                            </TouchableOpacity>

                        </View>

                        {/* ten_san_pham */}
                        <View>
                            <Text style={[styles.txt, { width: 400 }, { textAlign: "left" }, { fontSize: 28 }, { fontWeight: 'bold' }, { height: 50 }]}>{Product.ten_san_pham}</Text>
                        </View>

                        {/* gia - so_luong */}
                        <View style={{ flexDirection: "row", width: 400 }}>
                            {/* gia */}
                            <View style={{ flexDirection: "row", marginTop: -10 }}>
                                <Text style={[styles.txt, { marginLeft: 0 }, { fontSize: 26 }, { fontWeight: 'bold' }, { color: 'red' }]}>$ </Text>
                                <Text style={[styles.txt, { marginRight: 40 }, { fontSize: 26 }, { fontWeight: 'bold' }, { color: "grey" }]}>{VND.format(Product.gia)}</Text>
                            </View>


                        </View>

                        {/* mieu_ta */}
                        <View style={{ width: 400, height: 100, textAlign: "left", backgroundColor: "white", margin: 10 }}>
                            {/* <Text style={[{ color: 'grey' }, { fontSize: 17 }, { margin: 10 }]}>Description</Text> */}
                            <Text style={[styles.txt, { fontSize: 18 }]}>{Product.mieu_ta}</Text>
                        </View>

                        {/* thêm */}
                        <View style={{ width: '100%', height: 150, backgroundColor: "white", }}>
                            <Text style={[{ color: 'black' }, { fontSize: 22 }, { margin: 10 }, { fontWeight: 'bold' }]}>Thêm</Text>
                            {/* list */}
                            <View style={{ width: "100%", height: 100, backgroundColor: "white", alignItems: 'center', paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
                                <FlatList
                                    data={data_topping}
                                    renderItem={({ item }) => <TouchableOpacity>
                                        <Item_topping dataItem={item} />
                                    </TouchableOpacity>}
                                    keyExtractor={item => item.ID_topping}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                />
                            </View>
                        </View>

                        {/* giá-btn thêm giỏ hàng */}
                        <View style={{ flexDirection: "row", justifyContent: 'space-around', alignItems: "center", marginTop: 25 }}>
                            <View style={{ flexDirection: "column", marginTop: -15, marginRight: 10, backgroundColor: "white", width: 200 }}>
                                <View>
                                    <Text style={[{ color: 'black' }, { fontSize: 18 }, { textAlign: 'left' }, { marginBottom: 5 }, { fontWeight: 'bold' }]}> Tổng tiền:</Text>
                                </View>
                                <View style={{ flexDirection: "row", backgroundColor: "white", width: "100%" }}>
                                    <Text style={[styles.txt, { fontSize: 28 }, { fontWeight: 'bold' }, { color: 'red' }]}>$ </Text>
                                    <Text style={[styles.txt, { fontSize: 28 }, { fontWeight: 'bold' }]}>{VND.format(Product.gia)}</Text>
                                </View>
                            </View>
                            {/* btn thêm vào gio hàng */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => addToCart()}
                            >
                                <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    // chờ load trang
                    : <View style={styles.container}>
                        <Image
                            style={{ width: 250, height: 250 }}
                            source={require("../../img/Logo_ko_nen.png")}
                            resizeMode='contain'
                        />
                        <Text style={{ color: 'red', fontFamily: 'Poppins', fontSize: 28, fontWeight: 'bold', }}>BÁNH MÌ HÔNG</Text>
                    </View>
            }

        </SafeAreaView>
    )
}

export default Chi_tiet_san_pham

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFF', //mã màu nền
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        color: 'black',
        fontFamily: 'Poppins',
        // marginTop: 7,
    },
    button: {
        width: 200,
        backgroundColor: '#ed321d',
        height: 60,
        justifyContent: 'center',
        borderRadius: 20,
        marginRight: 5,
        // marginLeft: 15,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
})