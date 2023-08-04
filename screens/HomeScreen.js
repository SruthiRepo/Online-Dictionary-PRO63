import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            text:'',
            word:'',
            lexicalCategory:'',
            examples: [],
            definition:'',
            isSearchPressed: false
        }
    }

    getWord=(word)=>{
        var searchKeyWord = word.toLowerCase();
        var url= "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyWord+".json"
        return fetch(url)
        .then((data)=>{
            if(data.status===200)
            {
                return data.json()
            }
            else
            {
                return null
            }

        })
        .then((response)=>{

            var responseObj = response

            if (responseObj) {
                var wordData = responseObj.definitions[0]
                var definition = wordData.description
                var lexicalCategory=wordData.wordtype

                this.setState({
                    "word": this.state.text,
                    "definition": definition,
                    "lexicalCategory": lexicalCategory
                })
            } 
            else 
            {
                this.setState({
                    "word": this.state.text,
                    "definition": "Not Found",
                })
            }
        })
    }
    render(){
        return(
            <View>
                <Header
                centerComponent={{
                    text: "Pocket Dictionary",
                    style: {color:"#fff", fontSize: 20}
                }}/>
                <View style={styles.inputBoxContainer}>
                <TextInput
                onChangeText={(text)=>{
                    this.setState({
                        text:text,
                        word:"Loading...",
                        lexicalCategory:'',
                        examples: [],
                        definition:'',
                        isSearchPressed: false
                    })
                }}
                placeholder='enter a word'/>

                <TouchableOpacity
                onPress={()=>{
                    this.setState({
                        isSearchPressed: true,
                       
                    })
                    this.getWord(this.state.text)
                }}>
                    <Text>SEARCH</Text>
                </TouchableOpacity>

                </View>
                <View style={styles.outputContainer}>
                    <Text style={{fontSize: 20,}}>
                        {
                            this.state.isSearchPressed && this.state.word==="Loading..."
                            ? this.state.word
                            : ""
                        }
                    </Text>
                {this.state.word!=="Loading..."?(
                <View style={{justifyContent: "center", marginLeft: 10}}>
                    <View style={styles.detailsContainer}>
                    <Text>Word:{""}</Text>
                    <Text>
                        {this.state.word}
                    </Text>
                    </View>

                    <View style={styles.detailsContainer}>
                    <Text>
                        Type:{""}
                    </Text>
                    <Text>
                        {this.state.lexicalCategory}
                        </Text>
                    </View>

                    <View style={styles.detailsContainer}> 
                    <Text>Definition:{""}</Text>
                    <Text>{this.state.definition}
                    </Text>
                    </View>
                    


                
                </View>):null}
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({ container: { flex: 1, }, inputBoxContainer: { flex:0.3, alignItems:'center', justifyContent:'center' }, inputBox: { width: '80%', alignSelf: 'center', height: 40, textAlign: 'center', borderWidth: 4, }, searchButton: { width: '40%', height: 40, justifyContent: 'center', alignItems: 'center', margin: 10, borderWidth: 2, borderRadius: 10, }, searchText:{ fontSize: 20, fontWeight: 'bold' }, outputContainer:{ flex:0.7, alignItems:'center' }, detailsContainer:{ flexDirection:'row', alignItems:'center' }, detailsTitle:{ color:'orange', fontSize:20, fontWeight:'bold' } });