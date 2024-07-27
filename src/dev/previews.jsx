import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Questions from "../components/Questions";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Questions">
                <Questions/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews