import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import {View, Text, Picker, Icon, Container, Content} from 'native-base';
import * as ImagePicker from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';

const WIDTH = Dimensions.get('screen').width;

const ARRAY = [
  {
    name: 'Categories',
    value: '',
  },
  {
    name: 'One',
    value: 'One',
  },
  {
    name: 'Two',
    value: 'Two',
  },
  {
    name: 'Three',
    value: 'Three',
  },
  {
    name: 'Four',
    value: 'Four',
  },
  {
    name: 'Five',
    value: 'Five',
  },
];

const IMG_ARRAY = [
  {
    uri: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHdoaXRlJTIwb2ZmaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
  },
  {
    uri: 'https://images.unsplash.com/photo-1521401028694-d8df4e66e9e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjB0cmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      categoriesArray: ARRAY,
      categories: '',
      valuesArray: [],
      imageData: IMG_ARRAY,
      isVisible: false,
      index: 0,
      profileImg: '',
    };
  }

  selectCategories = value => {
    this.setState({categories: value});
    const {valuesArray} = this.state;
    let isValue = [];
    isValue = valuesArray.filter(data => data == value);
    if (isValue.length == 0) {
      this.setState({
        valuesArray: [...this.state.valuesArray, value],
      });
    }
  };

  removeData = value => {
    const {valuesArray} = this.state;
    let isValue = [];
    if (valuesArray.length == 1) {
      isValue = [];
      this.setState({categories: ''});
    } else {
      isValue = valuesArray.filter(data => data != value);
    }
    this.setState({valuesArray: isValue});
  };

  OpenGallery = async type => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, resp => {
      if (type == 0) {
        this.setState({profileImg: resp.assets[0].uri});
      } else {
        let val = {
          uri: resp.assets[0].uri,
        };

        this.setState({
          imageData: [...this.state.imageData, val],
        });
      }
    });
  };

  render() {
    const {
      name,
      description,
      categoriesArray,
      categories,
      valuesArray,
      imageData,
      isVisible,
      index,
      profileImg,
    } = this.state;
    return (
      <Container>
        <Content>
          <View style={styles.firstContainer}>
          <Text style={styles.titleText}>Create Profile</Text>
            <View style={styles.row}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.round}
                onPress={() => this.OpenGallery(0)}>
                {profileImg ? (
                  <Image source={{uri: profileImg}} style={styles.profileImg} />
                ) : (
                  <>
                    <Icon
                      name="pluscircle"
                      type="AntDesign"
                      style={styles.greyIcon}
                    />
                    <Text style={styles.greyText}>Upload Profile pic</Text>
                  </>
                )}
              </TouchableOpacity>
              <View>
                <View style={styles.formInputNor}>
                  <TextInput
                    placeholder="Name"
                    value={name}
                    style={styles.formInputText}
                    placeholderTextColor="#949499"
                    onChangeText={name => this.setState({name})}
                  />
                </View>
                <View style={styles.formInputDes}>
                  <TextInput
                    placeholder="Description"
                    value={description}
                    style={styles.formInputText}
                    placeholderTextColor="#949499"
                    onChangeText={description => this.setState({description})}
                  />
                </View>
              </View>
            </View>

            <View style={styles.column}>
              <View style={styles.formInputDrop}>
                <Picker
                  mode="dropdown"
                  style={{color: categories ? '#000' : '#a9a9a9', fontSize: 11}}
                  selectedValue={categories}
                  onValueChange={value => {
                    if (value != '') {
                      this.selectCategories(value);
                    }
                  }}>
                  {categoriesArray.map((item, key) => (
                    <Picker.Item
                      label={item.name}
                      value={item.value}
                      key={key}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.CategoriesMainView}>
                {valuesArray
                  ? valuesArray.map((item, i) => {
                      return (
                        <View style={styles.CategoriesView}>
                          <Text style={styles.CategoriesText}>{item}</Text>
                          <TouchableOpacity
                            onPress={() => this.removeData(item)}>
                            <Icon
                              name="closecircleo"
                              type="AntDesign"
                              style={styles.CategoriesIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  : null}
              </View>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.titleText}>Add Images/ Videos</Text>
            <View style={styles.ImageMainView}>
              {imageData
                ? imageData.map((item, i) => {
                    console.log('item ==> ', item);
                    return (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.ImageBgView}
                        onPress={() =>
                          this.setState({isVisible: true, index: i})
                        }>
                        <Image
                          source={{uri: item.uri}}
                          style={styles.imageSize}
                        />
                      </TouchableOpacity>
                    );
                  })
                : null}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.ImageBgView}
                onPress={() => this.OpenGallery(1)}>
                <Icon
                  name="pluscircle"
                  type="AntDesign"
                  style={styles.greyIcon}
                />
                <Text style={styles.greyText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isVisible ? (
            <ImageView
              images={imageData}
              imageIndex={index}
              visible={isVisible}
              onRequestClose={() => this.setState({isVisible: false})}
            />
          ) : null}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  firstContainer: {
    width: WIDTH,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    width: WIDTH,
    height: 222,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  column: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  formInputNor: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 10,
    height: 50,
    paddingHorizontal: 10,
    elevation: 18,
  },
  greyText: {
    fontSize: 13,
    color: '#a9a9a9',
  },
  greyIcon: {
    fontSize: 15,
    color: '#a9a9a9',
    marginBottom: 5,
  },
  formInputDes: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 10,
    height: 150,
    paddingHorizontal: 10,
    elevation: 18,
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  formInputDrop: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 10,
    height: 50,
    paddingHorizontal: 10,
    elevation: 8,
  },
  formInputText: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    paddingLeft: 5,
  },
  round: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    elevation: 12,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CategoriesView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 30,
    marginVertical: 5,
    borderRadius: 25,
    elevation: 25,
    marginHorizontal: 3,
  },
  CategoriesText: {
    color: '#000',
    fontSize: 12,
  },
  CategoriesMainView: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  CategoriesIcon: {
    fontSize: 13,
    color: '#a9a9a9',
    marginLeft: 12,
  },
  secondContainer: {
    width: WIDTH,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 12,
  },
  ImageMainView: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  ImageBgView: {
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    marginVertical: 5,
    borderRadius: 25,
    elevation: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSize: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 15,
  },
  subscriptionModal: {
    width: '90%',
    height: 500,
    borderRadius: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    width: 300,
    height: 300,
    borderRadius: 25,
  },
  wrap: {
    width: WIDTH,
    height: '100%',
  },
});

export default App;
