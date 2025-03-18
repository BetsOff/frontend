import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useSelectedLineContext } from '../../context/useSelectedLineContext';
import { useState } from 'react';

type MarketLineProps = {
    line: Line;
    marketLine: MarketLine;
}

const MarketLine: React.FC<MarketLineProps> = ({ line, marketLine }) => {
    const color = useColor();
    const { selectedLine, setSelectedLine } = useSelectedLineContext();
    const [showDescription, setShowDescription] = useState<boolean>(false);

    const first_price: string = marketLine.first_price > 0
        ? `+${marketLine.first_price}`
        : `${marketLine.first_price}`

    const second_price: string = marketLine.second_price > 0
        ? `+${marketLine.second_price}`
        : `${marketLine.second_price}`

    const first_selection: string = marketLine.market == 'h2h'
        ? line.home_tag
        : marketLine.first_selection
    
    const second_selection: string = marketLine.market == 'h2h'
        ? line.away_tag
        : marketLine.second_selection

    const marketTitle: string = marketLine.market == 'h2h'
        ? 'Moneyline'
        : 'Total Points'
    
    const marketDescription: string = marketLine.market == 'h2h'
        ? 'Who will win the game?'
        : 'How many combined points will be scored?'

    const handleWagerPressed = (first_selection_picked: boolean) => {
        setSelectedLine({
            market: marketLine.market,
            id: marketLine.id,
            first_selection_picked: first_selection_picked,
            wager: 0,
        })
    }

    const firstSelectionStyle = selectedLine.id == marketLine.id && selectedLine.first_selection_picked
        ? [styles.selectable, {backgroundColor: color.brand}]
        : [styles.selectable, {backgroundColor: color.background_3, borderColor: color.inactive_text}]

    const secondSelectionStyle = selectedLine.id == marketLine.id && !selectedLine.first_selection_picked
        ? [styles.selectable, {backgroundColor: color.brand}]
        : [styles.selectable, {backgroundColor: color.background_3, borderColor: color.inactive_text}]

    return (
        <View style={[styles.container, {backgroundColor: color.background_2}]}>
            <View style={[styles.marketTitleContainer, {backgroundColor: color.background_2}]}>
                <View style={[styles.marketTitleAndButton, {backgroundColor: color.background_2}]}>
                    <Text style={styles.marketTitle}>{marketTitle}</Text>
                    <TouchableOpacity onPress={() => setShowDescription(!showDescription)}>
                        <View style={[styles.infoButtonContainer, {backgroundColor: color.background_3}]}>
                            <Text style={styles.infoButton}>i</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {showDescription && (
                    <Text style={styles.marketDescription}>{marketDescription}</Text>
                )}
            </View>
            <View style={[styles.wager, {backgroundColor: color.background_2}]}>
                <TouchableOpacity onPress={() => handleWagerPressed(true)}>
                    <View style={firstSelectionStyle}>
                        <Text style={styles.defaultText}>{first_price} </Text>
                        <Text style={styles.defaultText}>{first_selection}</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.emptySpace, {backgroundColor: color.background_2}]} />
                <Text style={styles.point}>{marketLine.point}</Text>
                <View style={[styles.emptySpace, {backgroundColor: color.background_2}]} />
                <TouchableOpacity onPress={() => handleWagerPressed(false)}>
                    <View style={secondSelectionStyle}>
                        <Text style={styles.defaultText}>{second_selection} </Text>
                        <Text style={styles.defaultText}>{second_price}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderRadius: 10,
    },
    marketTitleContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    marketTitleAndButton: {
        flexDirection: 'row',   
        alignItems: 'center',
    },
    infoButtonContainer: {
        marginLeft: 10,
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        // Other styles
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5, // for Android
    },
    infoButton: {
        fontSize: 16,
        fontWeight: 700,
    },
    marketTitle: {
        fontSize: 18,
        fontWeight: 500,
    },
    marketDescription: {
        fontSize: 16,
        fontWeight: 100,
    },
    wager: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
    },
    selectable: {
        flexDirection: 'row',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        // Other styles
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5, // for Android
    },
    emptySpace: {
        width: '5%',
    },
    defaultText: {
        fontSize: 24,
    },
    selectedText: {
        fontSize: 24,
        color: 'green',
    },
    point: {
        fontSize: 24,
        fontWeight: 700,
    }
})

export default MarketLine