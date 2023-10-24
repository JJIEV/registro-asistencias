import { createMuiTheme } from "@mui/material/styles";
import jssPreset from "@mui/styles/jssPreset/jssPreset";

export default{
    input: "src/init.js",
    output: {
        dir: "dist",
        format: "cjs"
    },
    plugins: [

    ],
    external: ["jss-plugin-{}"],
    build: {
        rollupOptions: {
            plugins: [jssPreset().plugins]
        }
    }
};