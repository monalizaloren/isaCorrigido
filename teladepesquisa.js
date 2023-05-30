import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, FlatList } from "react-native";
import { Avatar, ListItem, Icon } from "react-native-elements";
import db from "../config";

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
      searchText: ""
    };
  }

  componentDidMount = async () => {
    this.getTransactions();
  };

  getTransactions = () => {
    db.collection('transactions')
      .limit(10)
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          this.setState(prevState => ({
            allTransactions: [...prevState.allTransactions, doc.data()],
            lastVisibleTransaction: doc
          }));
        });
      });
  };

  handleSearch = async text => {
    var enteredText = text.toUpperCase().split('');

    this.setState({
      allTransactions: []
    });

    if (!text) {
      this.getTransactions();
    }
  };

  renderItem = ({ item, i }) => {
    var date = item.date.toDate()
      .toString()
      .split(" ")
      .splice(0, 4)
      .join("");

    var transactionType = item.transaction_type === 'issue' ? 'issued' : 'returned';

    return (
      <View style={{ borderWidth: 1 }}>
        <ListItem key={i} bottomDivider>
          <Icon type="antdesign" name="book" size={40} />
          <ListItem.Content>
            <ListItem.Title style={styles.TitleStyle}>
              {`${item.book_name} (${item.book_id})`}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.Subtitle}>
              {`This book ${transactionType} by ${item.student_name}`}
            </ListItem.Subtitle>
            <View style={styles.lowerLeftContainer}>
              <View style={styles.transactionContainer}>
                <Text style={[styles.transactionText, {
                  color: item.transaction_type === 'issue' ? "#78D304" : "#0364F4"
                }]}>
                  {item.transaction_type.charAt(0).toUpperCase() +
                    item.transaction_type.slice(1)}
                </Text>
              </View>
              <View>
                <Text style={styles.date}>
                  {date}
                </Text>
              </View>
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TitleStyle: {
    fontSize: 20,
    fontFamily: "Rajdhani_600SemiBold"
  },
  Subtitle: {
    fontSize: 16,
    fontFamily: "Rajdhani_600SemiBold"
  },
  lowerLeftContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  transactionContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10
  },
  transactionText: {
    fontSize: 12,
    fontFamily: "Rajdhani_600SemiBold"
  },
  date: {
    fontSize: 12,
    fontFamily: "Rajdhani_600SemiBold"
  }
});
