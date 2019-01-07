using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using TournamentX.Web.Helpers;
using TournamentX.Infrastructure;
using TournamentX.Web.Extensions;
using TournamentX.Core.Config;

namespace TournamentX.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.TomRegisterServices(Configuration);

            services.AddDistributedMemoryCache();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IRequestFieldExtractor, RequestFieldExtractor>();
            TwilioConfig.AccountSid = Configuration["TwilioConfig:AccountSid"];
            TwilioConfig.AuthToken = Configuration["TwilioConfig:AuthToken"];
            TwilioConfig.PhoneNumber = Configuration["TwilioConfig:PhoneNumber"];

            services.AddSession(options =>
            {
                // Set a short timeout for easy testing.
                //options.IdleTimeout = TimeSpan.FromHours(2);
                options.Cookie.HttpOnly = true;
            });

            //services.AddHttpsRedirection(options =>
            //{
            //    options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
            //    options.HttpsPort = 443;
            //});

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders = ForwardedHeaders.XForwardedProto;
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSpaStaticFiles(c =>
            {
                //c.RootPath = "ClientApp/dist";
                c.RootPath = "wwwroot";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
                app.UseExceptionHandler("/Home/Error");
            }

            RequestFieldExtractor.Configure(app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());
            //app.UseForwardedHeaders(RedirectToProxiedHttpsExtensions.GetForwardedHeadersOptions());
            //app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseSession();

            app.UseMvc(routes =>
            {
                //routes.MapRoute(name: "default", template: "{controller}/{action=index}/{id}");
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });

            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = ".";
                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); // *! run ng serve manually
                    //spa.UseAngularCliServer(npmScript: "start");
                }
            });

        }

        
    }
}
