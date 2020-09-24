import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const CHOICES = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13589.png'
  },
  {
    name: 'paper',
    uri: 'http://pngimg.com/uploads/paper_sheet/paper_sheet_PNG7255.png'
  },
  {
    name: 'scissors',
    uri:
      'https://www.stickpng.com/assets/images/58a1ea43c8dd3432c6fa81c9.png'
  }
];

const getRoundOutcome = userChoice => {
  const computerChoice = randomComputerChoice().name;
  let result;

  if (userChoice === 'rock') {
    result = computerChoice === 'scissors' ? 'Victory' : 'Defeat';
  }
  if (userChoice === 'paper') {
    result = computerChoice === 'rock' ? 'Victory' : 'Defeat';
  }
  if (userChoice === 'scissors') {
    result = computerChoice === 'paper' ? 'Victory' : 'Defeat';
  }

  if (userChoice === computerChoice) result = 'Tie game';
  return [result, computerChoice];
};

const randomComputerChoice = () =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)];

const Button = props => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => props.onPress(props.name)}
  >
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);

const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={{ uri }} resizeMode="contain" style={styles.choiceImage} />
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
};

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gamePrompt: 'Fire!',
      userChoice: {},
      computerChoice: {},
      total: 0,
      win: 0,
      lose: 0,
      tie: 0
    }
  }

  getResultColor = () => {
    if (this.state.gamePrompt === 'Victory') {
      return '#25C998'
    };
    if (this.state.gamePrompt === 'Defeat') return '#ff6f8d';
    return "#342B98";
  };

  onPress = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);

    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);

    this.setState({
      userChoice: newUserChoice,
      computerChoice: newComputerChoice,
      gamePrompt: result,
      total: this.state.total + 1,
      win: result === 'Victory' ? this.state.win + 1 : this.state.win,
      lose: result === 'Defeat' ? this.state.lose + 1 : this.state.lose,
      tie: result === 'Tie game' ? this.state.tie + 1 : this.state.tie
    })
  };

  handleReset = () => {
    this.setState({
      gamePrompt: 'Fire!',
      userChoice: {},
      computerChoice: {},
      total: 0,
      win: 0,
      lose: 0,
      tie: 0
    });
  }

  render() {
    const { gamePrompt, userChoice, computerChoice, total, win, lose, tie } = this.state;
    let maX = Math.max(win, lose, tie);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTextWrapper}>
            {this.state.total !== 0 && (
              <View>
                <Text style={[styles.headerText, win == maX ? {color: "#ff6f8d"} : {color: "#342B98"}]} >Win rate: {total !== 0 ? Math.ceil((win / total) * 100) : 0}%</Text>
                <Text style={[styles.headerText, lose == maX ? {color: "#ff6f8d"} : {color: "#342B98"}]} >Lose rate: {total !== 0 ? Math.ceil((lose / total) * 100) : 0}%</Text>
                <Text style={[styles.headerText, tie == maX ? {color: "#ff6f8d"} : {color: "#342B98"}]} >Tie rate: {total !== 0 ? Math.ceil((tie / total) * 100) : 0}%</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={() => this.handleReset()}>
            <View style={styles.resetBtn}>
              <Text style={{ color: "#f5f5f5", fontSize: 26, fontWeight: "500" }}>Reset</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesWrapper}>
          <Text style={{ fontSize: 35, color: this.getResultColor() }}>{gamePrompt}</Text>
          <View style={styles.choicesContainer}>
            <ChoiceCard
              player="Player"
              choice={userChoice}
            />
            <Text style={{
              color: '#342B98',
              fontSize: 30,
              fontWeight: "500"
            }}>VS</Text>
            <ChoiceCard
              player="Computer"
              choice={computerChoice}
            />
          </View>
          {this.state.total !== 0 && (
            <Text style={styles.headerText}>Total: {this.state.total}</Text>
          )}
        </View>
        <View style={styles.buttonLayout}>
          {
            CHOICES.map(choice => {
              return <Button key={choice.name} name={choice.name} onPress={this.onPress} />;
            })
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bbebff'
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  headerTextWrapper: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#342B98",
    marginTop: 5
  },
  resetBtn: {
    width: 150,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#ff6f8d",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -50,
  },
  choicesWrapper: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLayout: {
    flexDirection: "row",
    marginTop: 50,
    flex: 0.8,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 120,
    margin: 10,
    height: 110,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25C998',
  },
  buttonText: {
    fontSize: 25,
    color: '#342B98',
    fontWeight: 'bold',
  },
  choicesContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 50
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#ff6f8d'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#342B98'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});
