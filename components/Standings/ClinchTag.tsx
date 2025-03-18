import { StyleSheet } from 'react-native';
import { Text, useColor, View } from '@/components/Themed';

type ClinchTagProps = {
    clinch: string | null;
    row_background: string;
}

const ClinchTag: React.FC<ClinchTagProps> = ({ clinch, row_background }) => {
    const color = useColor();
    var tag_background = color.brand;
    if (clinch == null) {
        tag_background = row_background
    } else if (clinch == 'E') {
        tag_background = color.background_3
    }
    
    return (
        <View style={[styles.clinchTag, {backgroundColor: tag_background}]}>
            <Text style={styles.clinchText}>{clinch ?? ''}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    clinchTag: {
        height: 24, 
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        
    },
    clinchText: {
        fontSize: 18,
        fontWeight: 900,
    }
});

export default ClinchTag;