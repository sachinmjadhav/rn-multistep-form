import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../constants/colors';

const StepIcon = (props) => {
  let styles;

  if (props.isActiveStep) {
    styles = {
      circleStyle: {
        width: 21,
        height: 21,
        borderRadius: 10.5,
        borderColor: colors.activeStepIconBorderColor,
        borderWidth: 5,
      },
      labelText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        width: 100,
        paddingTop: 4,
        marginTop: 4,
        color: colors.activeLabelColor,
        fontSize: 14,
      },
      leftBar: {
        position: 'absolute',
        top: 20 / 2,
        left: 0,
        right: 20 + 18,
        borderTopStyle: 'solid',
        borderTopWidth: 3,
        borderTopColor: colors.completedProgressBarColor,
        marginRight: 40 / 2 + 2,
      },
      rightBar: {
        position: 'absolute',
        top: 20 / 2,
        right: 0,
        left: 20 + 18,
        borderTopStyle: 'solid',
        borderTopWidth: 3,
        borderTopColor: colors.progressBarColor,
        marginLeft: 40 / 2 + 2,
      },
    };
  } else if (props.isCompletedStep) {
    styles = {
      circleStyle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.completedStepIconColor,
      },
      labelText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        width: 100,
        paddingTop: 4,
        color: 'lightgray',
        marginTop: 4,
        fontSize: 14,
      },
      leftBar: {
        position: 'absolute',
        top: 20 / 2,
        left: 0,
        right: 20 + 18,
        borderTopStyle: 'solid',
        borderTopWidth: 3,
        borderTopColor: colors.completedProgressBarColor,
        marginRight: 36 / 2 + 4,
      },
      rightBar: {
        position: 'absolute',
        top: 20 / 2,
        right: 0,
        left: 20 + 16,
        borderTopStyle: 'solid',
        borderTopWidth: 3,
        borderTopColor: colors.completedProgressBarColor,
        marginLeft: 36 / 2 + 4,
      },
    };
  } else {
    styles = {
      circleStyle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.disabledStepIconColor,
      },
      labelText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        width: 100,
        paddingTop: 4,
        color: 'lightgray',
        marginTop: 4,
        fontSize: 14,
      },
      leftBar: {
        position: 'absolute',
        top: 20 / 2,
        left: 0,
        right: 20 + 18,
        borderTopStyle: 'solid',
        borderTopWidth: 3,
        borderTopColor: colors.progressBarColor,
        marginRight: 20 / 2 + 4,
      },
      rightBar: {
        position: 'absolute',
        top: 20 / 2,
        right: 0,
        left: 20 + 8,
        borderTopStyle: 'solid',
        borderTopWidth: 3,
        borderTopColor: colors.progressBarColor,
        marginLeft: 20 / 2 + 4,
      },
    };
  }

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={styles.circleStyle} />
      <Text style={styles.labelText}>{props.label}</Text>
      {!props.isFirstStep && <View style={styles.leftBar} />}
      {!props.isLastStep && <View style={styles.rightBar} />}
    </View>
  );
};

export default StepIcon;
