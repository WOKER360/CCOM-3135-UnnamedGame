window.onload = function(){
    cc.game.onStart = function(){
        //load resources
        cc.LoaderScene.preload([], function () {
            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    var size = cc.director.getWinSize();


                    var In = cc.LabelTTF.create("in", "OCR A Std", 40);
                    In.setPosition(300, 300);
                    In.setColor(cc.color(0,255,0));
                    this.addChild(In, 1);

                    var Xile = cc.LabelTTF.create("Xile", "OCR A Std", 40);
                    Xile.setPosition(385, 300);
                    this.addChild(Xile, 1);

                    var userNameLabel = cc.LabelTTF.create("Username:", "OCR A Std", 20);
                    userNameLabel.setPosition(300,225);
                    this.addChild(userNameLabel, 1);

                    var passwordLabel = cc.LabelTTF.create("Password:", "OCR A Std", 20);
                    passwordLabel.setPosition(300,175);
                    this.addChild(passwordLabel, 1);
                }
            });
        cc.director.runScene(new MyScene()); }, this);
    };
    cc.game.run("gameCanvas");
};
