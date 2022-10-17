import { View, ScrollView } from 'react-native';
import { iconOptions } from './iconOptions';
import StyledText from './components/StyledText';
import getIcon from './tools/icon';
import { styles } from './styles/styles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useState } from 'react';
import StyledButton from './components/StyledButton';

export default function IconPicker(props) {
	const [selectedCategory, setSelectedCategory] = useState(1);
	const [expanded, setExpanded] = useState(false);

	const [displayIconFamilyPrevious, setDisplayIconFamilyPrevious] = useState('MaterialCommunityIcons');
	const [displayIconNamePrevious, setDisplayIconNamePrevious] = useState('card-text');

	const [showHelp, setShowHelp] = useState(false);

	const categories = [
		{
			name: 'Suggestions',
			subcategories: [],
			iconFamily: 'MaterialIcons',
			iconName: 'auto-awesome',
		},
		{
			name: 'Home and Office',
			subcategories: ['household', 'office', 'commerce', 'time'],
			iconFamily: 'FontAwesome5',
			iconName: 'home',
		},
		{
			name: 'Tools, Tech, and Fun',
			subcategories: ['tools', 'tech', 'fun'],
			iconFamily: 'Ionicons',
			iconName: 'construct',
		},
		{
			name: 'People and Travel',
			subcategories: ['people', 'clothing', 'activity', 'travel', 'places'],
			iconFamily: 'MaterialCommunityIcons',
			iconName: 'human-male-female',
		},
		{
			name: 'Outside and Nature',
			subcategories: ['nature', 'food'],
			iconFamily: 'FontAwesome5',
			iconName: 'tree',
		},
		{
			name: 'Shapes and Symbols',
			subcategories: ['symbols'],
			iconFamily: 'MaterialCommunityIcons',
			iconName: 'shape',
		},
	];

	const getCategoryButtons = () => {
		return categories.map((category, index) => {
			return (
				<Pressable style={styles.margin3} key={index} onPress={() => setSelectedCategory(index)}>
					{getIcon(category.iconFamily, category.iconName, 30, styles.colors.gray)}
				</Pressable>
			);
		});
	};

	const getIconOptions = () => {
		if (selectedCategory == 0)
			return <View style={[styles.row, { flexWrap: 'wrap' }]}>{getSuggestedIconOptions()}</View>;
		return categories[selectedCategory].subcategories.map(subcategory => {
			return <View style={[styles.row, { flexWrap: 'wrap' }]}>{getIconOptionsBySubcategory(subcategory)}</View>;
		});
	};

	const getIconOptionsBySubcategory = subcategory => {
		return iconOptions
			.filter(iconOption => subcategory == iconOption.subcategory)
			.sort((a, b) => a.iconName > b.iconName)
			.map(iconOption => {
				return getOptionElement(iconOption.iconFamily, iconOption.iconName);
			});
	};

	const getSuggestedIconOptions = () => {
		const suggestedIconOptions = [];
		iconOptions.forEach(option => {
			for (let i = 0; i < option.tags.length; i++) {
				const tag = option.tags[i];
				if (props.taskTitle.toLowerCase().includes(tag)) {
					suggestedIconOptions.push({ option, score: 1 / (i + 1) });
					break;
				}
			}
		});
		return suggestedIconOptions
			.sort((a, b) => a.score < b.score)
			.map(iconOption => {
				return getOptionElement(iconOption.option.iconFamily, iconOption.option.iconName);
			});
	};

	const getOptionElement = (family, name) => {
		const selected = family == props.family && name == props.name;
		return (
			<Pressable
				style={[styles.padding2, selected ? styles.iconPickerOptionSelected : styles.iconPickerOption]}
				onPress={() => {
					props.onChange(family, name);
				}}>
				{getIcon(family, name, family == 'FontAwesome5' ? 20 : 24, 'black')}
			</Pressable>
		);
	};

	if (props.helpTips) {
		helpContent = (
			<View style={styles.helpElement}>
				{props.helpTips.map((tip, index) => {
					return (
						<View key={index} style={styles.alignedRow}>
							<View style={styles.helpIcon}>
								{getIcon('FontAwesome5', 'arrow-circle-right', 16, styles.colors.gray2)}
							</View>
							<StyledText style={styles.helpText}>{tip}</StyledText>
						</View>
					);
				})}
			</View>
		);
	}

	return (
		<View style={styles.formSectionBorder}>
			<View style={[styles.editField]}>
				<View style={[styles.alignedRow]}>
					<View style={[styles.marginRight3, styles.formLabelIcon]}>
						{getIcon(props.labelIconFamily, props.labelIconName, 24, styles.colors.blue2)}
					</View>
					<StyledText style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
					<View style={styles.horizontalLine}></View>
					<Pressable style={styles.helpButton} onPress={() => setShowHelp(!showHelp)}>
						{getIcon(
							'MaterialCommunityIcons',
							showHelp ? 'help-circle' : 'help-circle-outline',
							24,
							styles.colors.gray2
						)}
					</Pressable>
				</View>
				<View style={styles.formBody}>
					<View style={[styles.alignedRow, styles.marginLeft2]}>
						<View style={styles.iconPickerDisplayIcon}>
							{getIcon(props.family, props.name, 36, styles.colors.gray)}
						</View>
						{expanded ? (
							[
								<StyledButton
									onPress={() => {
										setExpanded(false);
										props.onChange(displayIconNamePrevious, displayIconFamilyPrevious);
									}}
									label='Cancel'
									iconFamily='MaterialCommunityIcons'
									iconName='cancel'
								/>,
								<StyledButton
									onPress={() => {
										setExpanded(false);
										setDisplayIconNamePrevious(props.name);
										setDisplayIconFamilyPrevious(props.family);
									}}
									label='Save'
									iconFamily='MaterialCommunityIcons'
									iconName='check'
								/>,
							]
						) : (
							<StyledButton
								onPress={() => {
									setExpanded(true);
								}}
								label='Change'
								iconFamily='MaterialCommunityIcons'
								iconName='square-edit-outline'
							/>
						)}
					</View>
					{showHelp && helpContent}
					{expanded && (
						<View>
							<View style={styles.alignedRow}>{getCategoryButtons()}</View>
							<StyledText>{categories[selectedCategory].name}</StyledText>
							<View>
								<View>{getIconOptions()}</View>
							</View>
						</View>
					)}
				</View>
			</View>
		</View>
	);
}
