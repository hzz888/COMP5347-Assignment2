

function BrandPicSelector(brand){
    // get project root directory
    let picDir = `./assets/phone_default_images`;
    let picUri;
    switch (brand){
        case "Apple":
            picUri  = `${picDir}/Apple.jpeg`;
            break;
        case "BlackBerry":
            picUri  = `${picDir}/BlackBerry.jpeg`;
            break;
        case "HTC":
            picUri  = `${picDir}/HTC.jpeg`;
            break;
        case "Huawei":
            picUri  = `${picDir}/Huawei.jpeg`;
            break;
        case "LG":
            picUri  = `${picDir}/LG.jpeg`;
            break;
        case "Motorola":
            picUri  = `${picDir}/Motorola.jpeg`;
            break;
        case "Nokia":
            picUri  = `${picDir}/Nokia.jpeg`;
            break;
        case "Samsung":
            picUri  = `${picDir}/Samsung.jpeg`;
            break;
        case "Sony":
            picUri  = `${picDir}/Sony.jpeg`;
            break;
        default:
            picUri  = `${picDir}/Apple.jpeg`;
    }
    return picUri ;
}

export default BrandPicSelector;