/**
 *
 * Select random commander from pool;
 *
 */

function Commanders( view, selector, list, pool ){
	this.view = document.getElementById( view );
	this.selector = document.getElementById( selector );
	this.list = document.getElementById( list );
	this._commanderClass = 'commander';
	this.defaultPoolList = pool;
	this.pool = [];
	this.used = [];
}

Commanders.prototype = {
	
	init : function(){
		if( ! ( this.pool instanceof Array ) ){
			this.message( '<code>pool</code> defined in config.js in not an Array' );
			return;
		}
		this._generateList();
		this._regeneratePool();
		this._registerEvents();
		this.message( this.getRandomCommander() );
	},
	
	message : function( msg ){
		if( this.view ){
			this.view.innerHTML = msg;
		} else {
			alert( msg );
		}
	},
	
	_registerEvents : function(){
		if( this.selector ){
			this.selector.addEventListener( 'click', ( function(){
				this.message( this.getRandomCommander() );
			} ).bind( this ) );
		}
		Array.prototype.forEach.call(
			document.getElementsByClassName( this._commanderClass ),
			( function( elem, index ){
				elem.addEventListener( 'change', ( function(){ return this._regeneratePool.call( this ); } ).bind( this ) );
			} ).bind( this )
		);
	},
	
	_generateList : function(){
		if( this.list ){
			var list = '';
			for( x in this.defaultPoolList ){
				list += '<li>';
					list += '<label>';
						list += '<input type="checkbox" name="commander[]" value="' + x + '" class="' + this._commanderClass + '" checked>';
						list += ' ' + this.defaultPoolList[ x ];
					list += '</label>';
				list += '</li>';
			}
			this.list.innerHTML = list;
		}
	},
	
	_regeneratePool : function(){
		var newPool = [];
		Array.prototype.forEach.call(
			document.querySelectorAll( '.' + this._commanderClass + ':checked' ),
			function( elem, index ){
				newPool.push( elem.value );
			}
		);
		this.pool = newPool;
		this.used = [];
	},
	
	getRandomCommander : function(){
		
		if( usePoolSelect ){
			// reset if nothing in pool
			if( 0 === this.pool.length ){
				this.pool = this.used;
				this.used = [];
			}
			// if we have commander in pool select one
			var index = ( Math.random() * this.pool.length | 0 );
			var commander = this.pool.splice( index, 1 );
			this.used.push( commander );
			return this.defaultPoolList[ commander ];
		} else {
			var index = ( Math.random() * this.pool.length | 0 );
			return this.defaultPoolList[ this.pool[ index ] ];
		}
	}
	
};

// init commander select
( new Commanders( 'view', 'get-commander', 'commander-list', pool ) ).init();
