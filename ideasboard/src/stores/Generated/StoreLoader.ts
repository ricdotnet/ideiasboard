import { StoreManager } from "@idevelopthings/vue-class-stores/vue";
import { type App } from "vue";
export const stores = [{
        className: "SubscriptionStore",
        importPath: "../SubscriptionStore.ts",
        exportName: "subscriptionStore",
        vueBinding: "$subscription",
        actions: [{
                name: "subscribe",
                params: [{
                        name: "boardId",
                        type: "string"
                    }]
            }, {
                name: "unsub",
                params: []
            }],
        module: () => import.meta.glob("../SubscriptionStore.ts", { eager: true })
    }, {
        className: "UserStore",
        importPath: "../UserStore.ts",
        exportName: "userStore",
        vueBinding: "$user",
        actions: [],
        module: () => import.meta.glob("../UserStore.ts", { eager: true })
    }];
if (import.meta.hot) {
    import.meta.hot.accept(["./../SubscriptionStore", "./../UserStore"], modules => {
        console.log("stores updated", modules);
        StoreManager.handleHotReload(modules);
    });
}
